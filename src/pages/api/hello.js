export default function handler(req, res) {
  // Check if the HTTP method is GET
  if (req.method === "GET") {
    // Send a JSON response
    res.status(200).json({ message: "Hello World!" });
  } else {
    // If the method is not GET, return a 405 Method Not Allowed
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
