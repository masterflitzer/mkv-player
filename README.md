# MKV Player

Play `.webm` and `.mkv` movies using `AV1`, `VP9` or `VP8` codec inside the browser.

## Build

### Prerequisites

-   [NPM (included with NodeJS)](https://nodejs.org/en/download/current/)
-   [TypeScript](https://www.typescriptlang.org/download)

```
tsc   # transpile typescript code to javascript
```

## Usage

the app takes query string parameters

-   `path`: movie path

```
https://example.com/mkv-player/?path=/path/to/movie.mkv
```

### nginx

-   example for `.mkv` files only (because `.webm` is supported natively)

```
# mkv-player
location ~* \.mkv$ {
    # only when query string is empty
    if ($is_args = "") {
        return $scheme://$host/mkv-player/?path=$request_uri;
    }

    include mime.types;
    types {
        audio/webm mka;
        video/webm mkv mks;
        video/webm-3d mk3d;
    }
    default_type video/webm;
}
```
