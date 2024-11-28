

class LinearRegression:
    def __init__(self, lr=0.001, n_iters=1000):
        self.lr = lr
        self.iters = n_iters
        self.weights = None
        self.bias = None
    
    def fix(self, X, y):
        ## init parameters
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0

        for _ in range(self.n_iters):
            

    def predict(sef, X):
        pass