import { renderToString } from "react-dom/server";

/**
 * Represents a single todo item
 */
type Todo = {
  id: number;
  name: string;
};

/**
 * In-memory storage for todos
 * Note: This will reset when the server restarts
 */
const todos: Todo[] = [];

/**
 * Main request handler for the Bun server
 * Handles routing and business logic for the todo application
 * 
 * @param request - The incoming HTTP request
 * @returns A Response object with the appropriate content
 */
async function fetchHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);

  // Serve the main HTML page
  if (url.pathname === "" || url.pathname === "/") {
    return new Response(Bun.file("index.html"), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  // GET /todos - Retrieve all todos
  if (url.pathname === "/todos" && request.method === "GET") {
    return new Response(renderToString(<TodoList todos={todos} />), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  // POST /todos - Create a new todo
  if (url.pathname === "/todos" && request.method === "POST") {
    try {
      const body = (await request.json()) as { todo?: unknown };
      const { todo } = body;
      
      // Validate todo input
      if (!todo || typeof todo !== "string" || todo.trim() === "") {
        return new Response(
          JSON.stringify({ error: "Invalid todo: must be a non-empty string" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Add todo with incremental ID
      const newTodo: Todo = {
        id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
        name: todo.trim(),
      };
      todos.push(newTodo);

      return new Response(renderToString(<TodoList todos={todos} />), {
        headers: {
          "Content-Type": "text/html",
        },
      });
    } catch (error) {
      console.error("Error processing POST /todos:", error);
      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  // Handle 404 - Not Found
  return new Response("Not Found", { status: 404 });
}

/**
 * TodoList component - Renders the list of todos
 * 
 * @param props - Component props containing the todos array
 * @returns JSX element representing the todo list
 */
function TodoList(props: { todos: Todo[] }) {
  return (
    <ul>
      {props.todos.length
        ? props.todos.map((todo) => (
            <li key={`todo-${todo.id}`}>{todo.name}</li>
          ))
        : "No todos found"}
    </ul>
  );
}

/**
 * Start the Bun HTTP server
 */
const server = Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch: fetchHandler,
});

console.log(`🚀 Bun Todo app running on http://${server.hostname}:${server.port}`);
