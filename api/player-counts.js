export default async function handler(req, res) {
  const { universeIds } = req.query;

  if (!universeIds) {
    return res.status(400).json({ error: "Missing universeIds" });
  }

  try {
    const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=${universeIds}`);
    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch player counts" });
  }
}
