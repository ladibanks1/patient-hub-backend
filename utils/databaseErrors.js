const databaseErrors = (error) => {
  // Handling Moongose Error Structures
  let err = [];
  const errRegex = /validation failed/i
  if (errRegex.test(error.message)) {
    const key = Object.values(error.errors);
    key.map(({ properties, path , message }) => {
      err.push({
        message: properties?.message || (message && "Id is required"),
        path,
      });
    });
  } else if (error.message.includes("Unable to Send Mail")) {
    err.push(error);
  }
  if(err.length === 0) return error?.message
  return err;
};

export default databaseErrors;
