# News API Documentation


## Endpoints :

List of available endpoints:

- `GET /idols`
- `GET /idols/branches`
- `GET /idols/:id`
- `GET /songs/:spotifyId`
- `GET /video/:youtubeId`
- `GET /video/:youtubeLiveId`


&nbsp;


## 1. GET /idols

Description:
- Get Idols from database


_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "spotifyId": "2Iss9rGmxvoEfVigargjTH",
        "youtubeId": "UCP0BspO_AMEe3aQqqpo89Dg",
        "name": "Moona Hoshinova",
        "content": "Moon Moon~ Moona Dayo!\n\nA college girl who works as a model and idol, but later got interested to become a VTuber too.\nOn some rare occasion, Moona’s stream might be visited by Moona’s “another personality,”Hoshinova. That has deeper big sister-like voices and sadistic tendesion. Pay attention to her streams to meet Hoshinova!",
        "profileImage": "https://ik.imagekit.io/Holotiv8/Final_Project/Profile/moona_hoshinova_profile.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675090978351",
        "detailImage": "https://ik.imagekit.io/Holotiv8/Final_Project/Detail/moona_hoshinova_detail.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675091181830",
        "fanName": "Moonafic",
        "debut": "April 11, 2020",
        "birthday": "February 15",
        "height": "165 cm",
        "illustrator": "により",
        "BranchId": 1,
        "Branch": {
            "id": 1,
            "from": "Hololive Indonesia"
        }
    },
    {
        "id": 2,
        "spotifyId": "3PLJjPD8KDRzaEdznJT16j",
        "youtubeId": "UCOyYb1c43VlX9rc_lT6NKQw",
        "name": "Ayunda Risu",
        "content": "Hewwrroo everyone ~!!”; “Purupuru ganbari Risu ~!”\n\nA squirrel girl from a magical forest.\nShe was lost in the human world, but due to certain circumstances, she ends up living in the home of a kind older sister.\nTo return the favor, she decides to become a VTuber.\nRisu act, most of the time, just like a squirrel she is. She loves to do subtle pranks on people, shy with new people, and love to tease her viewer. Her laugh is also one of her unique characterictic.",
        "profileImage": "https://ik.imagekit.io/Holotiv8/Final_Project/Profile/ayunda_risu_profile.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675090978835",
        "detailImage": "https://ik.imagekit.io/Holotiv8/Final_Project/Detail/ayunda_risu_detail.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675091181643",
        "fanName": "Risuners",
        "debut": "April 10, 2020",
        "birthday": "January 15",
        "height": "153 cm",
        "illustrator": "Yatomi",
        "BranchId": 1,
        "Branch": {
            "id": 1,
            "from": "Hololive Indonesia"
        }
    }
]
```

&nbsp;


## 2. GET /idols/branches

Description:
- Get idol branch from database


_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "from": "Hololive Indonesia"
    },
    {
        "id": 2,
        "from": "Hololive Japan"
    },
    {
        "id": 3,
        "from": "Hololive English"
    }
]
```


&nbsp;


## 3. GET /idols/:id

Description:
- Find idol by Id

Request:


- params:

```json
{
  "IdolId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 20,
    "spotifyId": "726WiFmWkohzodUxK3XjHX",
    "youtubeId": "UC5CwaMl1eIgY8h02uZw7u8A",
    "name": "Hoshimachi Suisei",
    "content": "“It's your shooting star, your diamond in the rough, idol VTuber Hoshimachi Suisei!”\n\nA forever18 VTuber who deeply loves singing and idols.\nHer dream is to one day hold a live concert in Tokyo Budokan.",
    "profileImage": "https://ik.imagekit.io/Holotiv8/Final_Project/Profile/hoshimachi_suisei_profile.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675090970631",
    "detailImage": "https://ik.imagekit.io/Holotiv8/Final_Project/Detail/hoshimachi_suisei_detail.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675091180134",
    "fanName": "Hoshiyomi (Stargazers)",
    "debut": "March 22, 2018",
    "birthday": "March 22",
    "height": "160 cm",
    "illustrator": "Teshina Nari (Makeup charge)",
    "BranchId": 2,
    "Branch": {
        "id": 2,
        "from": "Hololive Japan"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;


## 4. GET /songs/:spotifyId

Description:
- Get data song from spotify

Request:


- params:

```json
{
  "id": "string (required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "releases": {
            "items": [
                {
                    "id": "7mLp1yLUJdrWyHWmvCTUCz",
                    "uri": "spotify:album:7mLp1yLUJdrWyHWmvCTUCz",
                    "name": "ソワレ",
                    "type": "SINGLE",
                    "date": {
                        "year": 2022,
                        "isoString": "2022-12-19T00:00:00Z"
                    },
                    "coverArt": {
                        "sources": [
                            {
                                "url": "https://i.scdn.co/image/ab67616d00001e028284c38d66c20437e0aa02a0",
                                "width": 300,
                                "height": 300
                            },
                            {
                                "url": "https://i.scdn.co/image/ab67616d000048518284c38d66c20437e0aa02a0",
                                "width": 64,
                                "height": 64
                            },
                            {
                                "url": "https://i.scdn.co/image/ab67616d0000b2738284c38d66c20437e0aa02a0",
                                "width": 640,
                                "height": 640
                            }
                        ]
                    },
                    "playability": {
                        "playable": true,
                        "reason": "PLAYABLE"
                    },
                    "sharingInfo": {
                        "shareId": "2rtMemMnSB259pxbxHQR3Q",
                        "shareUrl": "https://open.spotify.com/album/7mLp1yLUJdrWyHWmvCTUCz?si=2rtMemMnSB259pxbxHQR3Q"
                    },
                    "tracks": {
                        "totalCount": 2
                    }
                }
            ]
        }
    },
    ....
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;



## 5. GET /video/:youtubeId

Description:
- Get video from youtube by id

Request:

- params:

```json
{
  "youtubeId": "string (required)"
}
```


_Response (200 - OK)_

```json
[
    {
        "type": "video",
        "video": {
            "badges": [],
            "isLiveNow": false,
            "lengthSeconds": 8478,
            "movingThumbnails": [
                {
                    "height": 180,
                    "url": "https://i.ytimg.com/an_webp/6D3vofUyUPk/mqdefault_6s.webp?du=3000&sqp=CPnY4p4G&rs=AOn4CLDWrz5XuwJ22a_e6x0pv8IGbLO32g",
                    "width": 320
                }
            ],
            "publishedTimeText": "Streamed 14 hours ago",
            "stats": {
                "views": 27725
            },
            "thumbnails": [
                {
                    "height": 94,
                    "url": "https://i.ytimg.com/vi/6D3vofUyUPk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDv9dR7Hqn7JEfTQmO1P-83wgM0ew",
                    "width": 168
                },
                {
                    "height": 110,
                    "url": "https://i.ytimg.com/vi/6D3vofUyUPk/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDpxZUGz2IqSfF7iHS_jJFTxfQLNQ",
                    "width": 196
                },
                {
                    "height": 138,
                    "url": "https://i.ytimg.com/vi/6D3vofUyUPk/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDec9_aOczAF9btRpXa0YhGMHiTMw",
                    "width": 246
                },
                {
                    "height": 188,
                    "url": "https://i.ytimg.com/vi/6D3vofUyUPk/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAtRnv_W5M1Cd2deEVw7En-ZeS70w",
                    "width": 336
                }
            ],
            "title": "【Random Talk + Donation Reading】KIMONO? HUEHUEHEHEHEHEHEHE.【Kaela Kovalskia / hololiveID】",
            "videoId": "6D3vofUyUPk"
        }
    },
    {
        "type": "video",
        "video": {
            "badges": [],
            "isLiveNow": false,
            "lengthSeconds": 27455,
            "movingThumbnails": [
                {
                    "height": 180,
                    "url": "https://i.ytimg.com/an_webp/Q7hGUFBewxU/mqdefault_6s.webp?du=3000&sqp=CJHk4p4G&rs=AOn4CLD7zsX0U2I6Vryu4z5mhsf_4x0_sQ",
                    "width": 320
                }
            ],
            "publishedTimeText": "Streamed 1 day ago",
            "stats": {
                "views": 116892
            },
            "thumbnails": [
                {
                    "height": 94,
                    "url": "https://i.ytimg.com/vi/Q7hGUFBewxU/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCNMYnTusYPqzXZw1Zwfm3izDqQpQ",
                    "width": 168
                },
                {
                    "height": 110,
                    "url": "https://i.ytimg.com/vi/Q7hGUFBewxU/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBkhM3QKOmOVYbob2ZtiWEy3_lbPg",
                    "width": 196
                },
                {
                    "height": 138,
                    "url": "https://i.ytimg.com/vi/Q7hGUFBewxU/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBOZuEOV5Yg5WtrG6Pj0ejYeeIxDQ",
                    "width": 246
                },
                {
                    "height": 188,
                    "url": "https://i.ytimg.com/vi/Q7hGUFBewxU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDFQMSJnHTouwcS0o7tW6_KWoRqSA",
                    "width": 336
                }
            ],
            "title": "【Minecraft】moving the ocean to my place.... why not?【Kaela Kovalskia / hololiveID】",
            "videoId": "Q7hGUFBewxU"
        }
    }
]
```

&nbsp;

## 6. GET /video/:youtubeLiveId

Description:
- Get live video from youtube by id

Request:

- params:

```json
{
  "youtubeId": "string (required)"
}
```


_Response (200 - OK)_

```json
[
    {
      "type": "video",
      "video": {
        "author": {
          "avatar": [
            {
              "height": 68,
              "url": "https://yt3.googleusercontent.com/PxkGgLvMEUgmme35T0VPLR8d5brJw4YTzJC5PE48mkYRdy-mq8FsKv_Sy-bJmxqvlgtitqMWtg=s68-c-k-c0x00ffffff-no-rj",
              "width": 68
            }
          ],
          "badges": [
            {
              "text": "Verified",
              "type": "VERIFIED_CHANNEL"
            }
          ],
          "canonicalBaseUrl": "/@KaelaKovalskia",
          "channelId": "UCZLZ8Jjx_RN2CXloOmgTHVg",
          "title": "Kaela Kovalskia Ch. hololive-ID"
        },
        "badges": [],
        "isLiveNow": true,
        "lengthSeconds": null,
        "movingThumbnails": null,
        "publishedTimeText": null,
        "stats": {
          "viewers": 2045
        },
        "thumbnails": [
          {
            "height": 94,
            "url": "https://i.ytimg.com/vi/6D3vofUyUPk/hqdefault_live.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLB13fdWYQIoSJA5c616CkOacuN60Q",
            "width": 168
          },
          {
            "height": 110,
            "url": "https://i.ytimg.com/vi/6D3vofUyUPk/hqdefault_live.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA9r5PO22K8T6SIYFA0RsHTb8vW6Q",
            "width": 196
          },
          {
            "height": 138,
            "url": "https://i.ytimg.com/vi/6D3vofUyUPk/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCv86EbwKz41_to_1vJ9J1HcpC5_A",
            "width": 246
          },
          {
            "height": 188,
            "url": "https://i.ytimg.com/vi/6D3vofUyUPk/hqdefault_live.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCygEc_rb6q6H9IWoUUNYFqg3sbtw",
            "width": 336
          }
        ],
        "title": "【Random Talk + Donation Reading】KIMONO? HUEHUEHEHEHEHEHEHE.【Kaela Kovalskia / hololiveID】",
        "videoId": "6D3vofUyUPk"
      }
    }
  ]
```

&nbsp;


## Global Error


_Response (401 - Unauthorized & JsonWebTokenError)_

```json
{
  "message": "Error Authentication"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
