const dialogflow = require('dialogflow');
const uuid = require('uuid');

let privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzYyiVdLoe4yvZ\nYvUN3ckVfYAPTt69JdmmFkjEbbrgWZsuIPRSJ3v/SHm+yv3/5sLHJUP1vZljFALA\ng+v3NpD/cEiW1sBU56BewLoj+gL5LvTXf6EMZxCfsArT2k1v8ug+RO2LJdGzfK2B\nwK1zPISyMQBB6g5QmXsd2sitGGhbco/bi95TGFt5lfM2Ovei9KjR8XaSRfPb7Uov\ns5L6dvHP6IHGNDkLbXQ1ybwRONmccOftwrOgqvjAsC3QovfQvnjoi59juoFu9Mri\nGw6SU7X8+MTp8EeoI2D+rp5J90DUgcS4JUxy6f+6o39liSafKHPI3Iv15O1LP0tE\nqWOOskKHAgMBAAECggEABO1MSA6UrhR/N9FH+cGFrFluEv2PkJJhj/Y8uWhqIY9U\ne8fb7gW3miNbdKoOn+CuqNmVLEKw28/I45C8AmY1RU7IL5xmW+6gsPmKI0LSohVw\nFBslSTnrcvda1MbCKbj6N/ucqp23TL635UBtgyS+YEaIQ0cybXRJtWA08swg0aIg\nFZsURs15AUc/wTljfWJApeBPQKZFNZ+l31RVo9WVcGfwHqMZdqcIVJ1s9WhXEKgw\nwhjbe4uF+6k4rt4NwlsvUwHnCgctoR3DBkkpPJEwf6Zey7RGpifxwt4onHkBJXJM\nJU0+3d2DeYRbNsVP/NGgqMaoVWGsw2cnmq1F0F68gQKBgQDkgxFIzp6z0ABREvOQ\nMw2T3kYm7GvbjU2/RD2rCogbIb9oSAwxjlbfTKN2PqHF7W84OWhNrlRhdhRSBMir\nfZl4xo8zF3bbP1NKf+yZBD5PjVPjLzzlKjCIyXr2M3MNkO8krO20CynuSSP+x78e\nzL1cYxWtqx+XN/Mi3wKi46zIOQKBgQDI91FbOSISyos/FXaFMaVe45qnHs8FjIKZ\n2zfCXdbDn74S3mjeR4rHl4xy7kfvIgcsiONGmbuiyQPqkyS7xMm9Qs6e8FuXWmJV\ntcggi3aHT/J4wjpyEzKSZ0aBB37ZmY3Y/V2v2y499F3VgUUWT1gbm1l73mV1NgLp\njw44eE/gvwKBgQCxlnq0Tn9f1uKoH0ZSZprCtBdo4IviEKq/XlVeu8yS6WNLs9Jm\nIOy6lWDj4EDxBVlOJK8+z6CcLZwVMcqSHAZNqmJXnoCsW0Zru4cwU+/o+ziacnes\n0WDurUZ2V/2uKVjw88O4DIUFvqnOs4WAdjUju415bmgaqUy3aQEvfiklYQKBgBVC\nfJvO5njgbmylA53Bi8IHB/RIARSQMby/AR4RuUeGnZ/3YVaqcNb+hEAgTwHQMrwW\nWxy75Kqq4zwshsVKYyEfcSZFPRs814xDp8Exn79eyMLXoUEyILZ2MHIz7cptQSFE\nZGXXJQQu1sJgY4Ohryt0erns5ATLSvGUTafRqnmXAoGAP632Pa3X0uI8o16Q6lQx\nKLUW19Z8fjH9IgQMbRvjHkpzQ9NumaxxzW7VSn7LpBCXtwhMV+1gd5V1acc4DAD1\nW2zyokc+xp5FY1RQp/Dg5ZGF3J7CDmnQVPsSgbelQme0CG3EJMMtyZYMoOxfJuvT\nVjE/5mqQP84aoTa5dVikafU=\n-----END PRIVATE KEY-----\n";
let clientEmail = "endo-webai-svc-account@endo-webai.iam.gserviceaccount.com";
let config = {
credentials: {
    private_key: privateKey,
    client_email: clientEmail
}
};

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'endo-webai') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(config);
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'hello',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
}

runSample()
