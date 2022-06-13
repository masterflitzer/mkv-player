if (document.readyState === "complete" || document.readyState === "interactive")
    main();
else globalThis.addEventListener("DOMContentLoaded", main);

function main() {
    const queryParams = new URLSearchParams(globalThis.location.search);
    const path = queryParams.get("path");
    if (path == null) {
        const msg = "No path was specified in the query string";
        throw alertAndThrow(msg);
    }

    const hasCorrectExtension = path.endsWith(".mkv") || path.endsWith(".webm");
    if (!hasCorrectExtension) {
        const msg =
            "This player only supports .mkv and .webm files with VP8/VP9/AV1 codec";
        throw alertAndThrow(msg);
    }

    const template = document.querySelector(
        "#player-template"
    ) as HTMLTemplateElement | null;
    if (template == null) {
        const msg = "Could not find the HTML template";
        throw alertAndThrow(msg);
    }

    const player = template.content.cloneNode(true);
    let video =
        (Array.from(player.childNodes).find(
            (node) =>
                node.nodeType === Node.ELEMENT_NODE &&
                node.nodeName.toLowerCase() === "video"
        ) as HTMLVideoElement) ?? null;

    if (video == null) {
        const msg = "Could not find the video element inside the template";
        throw alertAndThrow(msg);
    }

    const source = video.querySelector("source");
    if (source == null) {
        const msg = "Could not find the source element inside the template";
        throw alertAndThrow(msg);
    }

    document.title = path;
    video.autoplay = true;
    video.controls = true;
    source.src = `${path}?default=1`;
    source.type = "video/webm";

    document.body.appendChild(player);
    playHandleMEI(video);
}

async function playHandleMEI(video: HTMLVideoElement) {
    try {
        video.muted = false;
        await video.play();
    } catch (e) {
        console.warn(e);
        console.info(
            "Playing muted because autoplay is not allowed\nfor more information look up Media Engagement Index (MEI)"
        );
        video.muted = true;
        video.play();
    }
}

function alertAndThrow(msg: string) {
    alert(msg);
    throw new Error(msg);
}
