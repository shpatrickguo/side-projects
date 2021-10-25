module.exports = {
    name: "socials",
    aliases: ["social"],
    permissions: [],
    description: "lists socials",
    execute(message, args, cmd, client, Discord) {
      const embed = new Discord.MessageEmbed()
        .setColor("FADF2E")
        .setTitle(`Socials 🌐`)
        .setThumbnail(
          "https://static.wixstatic.com/media/0ecae5_f1d5479031114df8ac2adcde1b44a3f4~mv2.png/v1/fill/w_466,h_160,al_c,q_85,usm_0.66_1.00_0.01/DAANG-01-1024x351.webp"
        )
        .setAuthor(
          "DaanMatch",
          "https://media-exp1.licdn.com/dms/image/C560BAQEYGvW8wH3CSw/company-logo_200_200/0/1605310347627?e=1621468800&v=beta&t=JdCjZ9wqvwcJ1nhgukP25Wz6heKDjLRrnXjdC6_y4LU",
          "https://www.daanmatch.org/"
        )
        .addFields(
          {
            name: "LinkedIn",
            value: "https://www.linkedin.com/company/daanmatch/"
          },
          {
            name: "Twitter",
            value: "https://twitter.com/DaanMatch"
          },
          {
            name: "Website",
            value: "https://www.daanmatch.org/"
          },
          {
            name: "GitHub (Private)",
            value: "https://github.com/DaanMatch"
          }
        );
      message.channel
        .send(embed)
        .catch((err) => {
          throw err;
        });
    },
  };
  