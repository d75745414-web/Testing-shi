export default async function handler(req, res) {
    const { universeIds } = req.query;
    if (!universeIds) return res.status(400).json({ error: "Missing universeIds" });

    const ids = universeIds.split(",").filter(id => /^\d+$/.test(id));
    if (!ids.length) return res.status(400).json({ error: "No valid universeIds" });

    try {
        const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${ids.join(",")}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch Roblox API" });
    }
}
