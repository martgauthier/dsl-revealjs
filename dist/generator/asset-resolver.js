import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import crypto from "crypto";
export class AssetResolver {
    outputDir;
    constructor(outputDir) {
        this.outputDir = outputDir;
    }
    mediaDir = "media";
    async resolve(src) {
        if (!src.startsWith("http://") && !src.startsWith("https://")) {
            return src; // déjà local
        }
        const ext = path.extname(src).split("?")[0] || ".bin";
        const hash = crypto.createHash("sha1").update(src).digest("hex");
        const filename = `${hash}${ext}`;
        const mediaPath = path.join(this.outputDir, this.mediaDir);
        const filePath = path.join(mediaPath, filename);
        fs.mkdirSync(mediaPath, { recursive: true });
        if (!fs.existsSync(filePath)) {
            await this.download(src, filePath);
        }
        return `./${this.mediaDir}/${filename}`;
    }
    download(url, dest) {
        const client = url.startsWith("https") ? https : http;
        return new Promise((resolve, reject) => {
            client.get(url, res => {
                // 🔁 GESTION DES REDIRECTIONS (302, 301, 307, 308)
                if (res.statusCode &&
                    res.statusCode >= 300 &&
                    res.statusCode < 400 &&
                    res.headers.location) {
                    this.download(res.headers.location, dest)
                        .then(resolve)
                        .catch(reject);
                    return;
                }
                if (res.statusCode !== 200) {
                    reject(new Error(`Download failed (${res.statusCode}): ${url}`));
                    return;
                }
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on("finish", () => file.close(() => resolve()));
                file.on("error", reject);
            }).on("error", reject);
        });
    }
}
//# sourceMappingURL=asset-resolver.js.map