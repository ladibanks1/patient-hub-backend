// Import colors
import colors from "colors";


// Logger Middleware
const logger = (req, res, next) => {
  const request = {
    method: req.method,
    url: req.originalUrl,
    host: req.hostname,
    protocol: req.protocol,
    port: req.socket.localPort,
    time: new Date().toLocaleTimeString(),
    message: function () {
      return `${this.method}  ${this.protocol}://${this.host}:${this.port}${this.url} at ${this.time}`;
    },
    Agent: function () {
      switch (this.method) {
        case "GET":
          return colors.yellow(this.message());
        case "POST":
          return colors.green(this.message());
        case "PUT":
          return colors.blue(this.message());
        case "DELETE":
          return colors.red(this.message());
        case "PATCH":
          return colors.magenta(this.message());
        default:
          return colors.cyan(this.message());
      }
    },
  };
  console.log(request.Agent());
  next();
};

export default logger;
