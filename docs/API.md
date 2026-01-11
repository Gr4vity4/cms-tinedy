# Tinedy CMS API Documentation

This document describes the Strapi Content API for this project and points to the OpenAPI (Swagger) specification.

## Swagger / OpenAPI

- Spec file: `docs/swagger.json`
- Load the spec in Swagger UI or Postman to explore endpoints.

## Base URL

- Default local base URL: `http://localhost:1337`
- All content endpoints are prefixed with `/api`.

## Authentication

- Most endpoints require a Bearer token (`Authorization: Bearer <token>`).
- API tokens and Users & Permissions JWTs both use Bearer auth in Strapi.
- Public access is controlled in Strapi Admin > Settings > Roles & Permissions.
- **Public endpoint**: `POST /api/contact-forms` is configured as public (`auth: false`).

## Response Shape

Strapi wraps responses in a `data` object:

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Example",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

Collection responses include pagination in `meta.pagination`.

All content types include system fields `createdAt` and `updatedAt` in responses. Draft-enabled types also include `publishedAt`.

Response examples below include all fields for the content type. Related entities are shown with only a few key fields for brevity.

## Create / Update Shape

Create and update requests must wrap payloads in a `data` object:

```json
{
  "data": {
    "title": "My Title"
  }
}
```

### Relations

- For one-to-one or many-to-one, send a single ID.
- For many-to-many or one-to-many, send an array of IDs.

```json
{
  "data": {
    "author": 3,
    "relatedBlogs": [2, 5]
  }
}
```

### Media

- Upload files first, then reference the returned file IDs.
- Single media fields accept one ID; multi media fields accept an array of IDs.

```json
{
  "data": {
    "thumbnail": 10,
    "images": [11, 12]
  }
}
```

### Components

- Single components are objects; repeatable components are arrays of objects.

```json
{
  "data": {
    "seo": {
      "metaTitle": "My Page",
      "metaDescription": "Summary"
    }
  }
}
```

### Dynamic Zones

- Dynamic zones are arrays; each item must include `__component` with the component UID.

```json
{
  "data": {
    "blocks": [
      {
        "__component": "shared.quote",
        "title": "Sample",
        "body": "Quote body"
      },
      {
        "__component": "shared.media",
        "file": 42
      }
    ]
  }
}
```

## Query Parameters

- `pagination[page]`, `pagination[pageSize]` for page-based pagination
- `pagination[start]`, `pagination[limit]` for offset pagination
- `sort=field:asc,otherField:desc`
- `filters[slug][$eq]=my-slug` (deep filtering supported)
- `populate=*` to include relations, media, and components
- `fields=title,slug` to pick specific fields
- For Article and Blog (draft & publish): `publicationState=preview`

## Media Uploads

- Upload files via Strapi's Upload API (`POST /api/upload`, multipart/form-data).
- Use returned file IDs in media fields when creating or updating content.

## Content Types

### About (`about`)

Write about yourself and the content you create

Type: `singleType`

Endpoints:
- `GET /api/about`
- `PUT /api/about`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | No |  |
| `blocks` | dynamiczone | No | allowed: about.hero, about.story-section, about.manifesto, about.mission, shared.media, shared.quote, shared.rich-text, shared.slider |

#### Response Examples

`GET /api/about`
`PUT /api/about`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Sample title",
      "blocks": [
        {
          "__component": "about.hero",
          "id": 1,
          "backgroundImage": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "body": "<p>Sample rich text</p>"
        },
        {
          "__component": "about.story-section",
          "id": 1,
          "items": [
            {
              "id": 1,
              "eyebrow": "Sample eyebrow",
              "title": "Sample title",
              "description": "Sample description",
              "image": {
                "data": {
                  "id": 1,
                  "attributes": {
                    "name": "example.jpg",
                    "alternativeText": "Alt text",
                    "caption": "Caption",
                    "width": 1200,
                    "height": 800,
                    "formats": null,
                    "hash": "example_hash",
                    "ext": ".jpg",
                    "mime": "image/jpeg",
                    "size": 123.45,
                    "url": "/uploads/example.jpg",
                    "previewUrl": null,
                    "provider": "local",
                    "provider_metadata": null,
                    "createdAt": "2024-01-01T00:00:00.000Z",
                    "updatedAt": "2024-01-01T00:00:00.000Z"
                  }
                }
              },
              "imageAlt": "Sample alt text",
              "imagePosition": "left"
            }
          ]
        },
        {
          "__component": "about.manifesto",
          "id": 1,
          "items": [
            {
              "id": 1,
              "leadingText": "string",
              "highlightText": "Highlight text",
              "highlightColor": "blue",
              "description": "Sample description"
            }
          ],
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        },
        {
          "__component": "about.mission",
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        },
        {
          "__component": "shared.media",
          "id": 1,
          "file": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          }
        },
        {
          "__component": "shared.quote",
          "id": 1,
          "title": "Sample title",
          "body": "string"
        },
        {
          "__component": "shared.rich-text",
          "id": 1,
          "body": "<p>Sample rich text</p>"
        },
        {
          "__component": "shared.slider",
          "id": 1,
          "files": {
            "data": [
              {
                "id": 1,
                "attributes": {
                  "name": "example.jpg",
                  "alternativeText": "Alt text",
                  "caption": "Caption",
                  "width": 1200,
                  "height": 800,
                  "formats": null,
                  "hash": "example_hash",
                  "ext": ".jpg",
                  "mime": "image/jpeg",
                  "size": 123.45,
                  "url": "/uploads/example.jpg",
                  "previewUrl": null,
                  "provider": "local",
                  "provider_metadata": null,
                  "createdAt": "2024-01-01T00:00:00.000Z",
                  "updatedAt": "2024-01-01T00:00:00.000Z"
                }
              }
            ]
          }
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Article (`article`)

Create your blog content

Type: `collectionType`

Endpoints:
- `GET /api/articles`
- `POST /api/articles`
- `GET /api/articles/{id}`
- `PUT /api/articles/{id}`
- `DELETE /api/articles/{id}`

Draft & Publish: enabled (`publishedAt` present; use `publicationState=preview` to include drafts).

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | No |  |
| `description` | text | No | maxLength: 80 |
| `slug` | uid | No | auto from `title` |
| `cover` | media | No | types: images, files, videos; single |
| `author` | relation (manyToOne) | No | manyToOne -> api::author.author |
| `category` | relation (manyToOne) | No | manyToOne -> api::category.category |
| `blocks` | dynamiczone | No | allowed: shared.media, shared.quote, shared.rich-text, shared.slider |

#### Response Examples

`GET /api/articles`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Sample title",
        "description": "Sample description",
        "slug": "sample-slug",
        "cover": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "author": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "Sample name",
              "email": "user@example.com"
            }
          }
        },
        "category": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "Sample name",
              "slug": "sample-slug"
            }
          }
        },
        "blocks": [
          {
            "__component": "shared.media",
            "id": 1,
            "file": {
              "data": {
                "id": 1,
                "attributes": {
                  "name": "example.jpg",
                  "alternativeText": "Alt text",
                  "caption": "Caption",
                  "width": 1200,
                  "height": 800,
                  "formats": null,
                  "hash": "example_hash",
                  "ext": ".jpg",
                  "mime": "image/jpeg",
                  "size": 123.45,
                  "url": "/uploads/example.jpg",
                  "previewUrl": null,
                  "provider": "local",
                  "provider_metadata": null,
                  "createdAt": "2024-01-01T00:00:00.000Z",
                  "updatedAt": "2024-01-01T00:00:00.000Z"
                }
              }
            }
          },
          {
            "__component": "shared.quote",
            "id": 1,
            "title": "Sample title",
            "body": "string"
          },
          {
            "__component": "shared.rich-text",
            "id": 1,
            "body": "<p>Sample rich text</p>"
          },
          {
            "__component": "shared.slider",
            "id": 1,
            "files": {
              "data": [
                {
                  "id": 1,
                  "attributes": {
                    "name": "example.jpg",
                    "alternativeText": "Alt text",
                    "caption": "Caption",
                    "width": 1200,
                    "height": 800,
                    "formats": null,
                    "hash": "example_hash",
                    "ext": ".jpg",
                    "mime": "image/jpeg",
                    "size": 123.45,
                    "url": "/uploads/example.jpg",
                    "previewUrl": null,
                    "provider": "local",
                    "provider_metadata": null,
                    "createdAt": "2024-01-01T00:00:00.000Z",
                    "updatedAt": "2024-01-01T00:00:00.000Z"
                  }
                }
              ]
            }
          }
        ],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/articles`
`GET /api/articles/{id}`
`PUT /api/articles/{id}`
`DELETE /api/articles/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Sample title",
      "description": "Sample description",
      "slug": "sample-slug",
      "cover": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "author": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "Sample name",
            "email": "user@example.com"
          }
        }
      },
      "category": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "Sample name",
            "slug": "sample-slug"
          }
        }
      },
      "blocks": [
        {
          "__component": "shared.media",
          "id": 1,
          "file": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          }
        },
        {
          "__component": "shared.quote",
          "id": 1,
          "title": "Sample title",
          "body": "string"
        },
        {
          "__component": "shared.rich-text",
          "id": 1,
          "body": "<p>Sample rich text</p>"
        },
        {
          "__component": "shared.slider",
          "id": 1,
          "files": {
            "data": [
              {
                "id": 1,
                "attributes": {
                  "name": "example.jpg",
                  "alternativeText": "Alt text",
                  "caption": "Caption",
                  "width": 1200,
                  "height": 800,
                  "formats": null,
                  "hash": "example_hash",
                  "ext": ".jpg",
                  "mime": "image/jpeg",
                  "size": 123.45,
                  "url": "/uploads/example.jpg",
                  "previewUrl": null,
                  "provider": "local",
                  "provider_metadata": null,
                  "createdAt": "2024-01-01T00:00:00.000Z",
                  "updatedAt": "2024-01-01T00:00:00.000Z"
                }
              }
            ]
          }
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Author (`author`)

Create authors for your content

Type: `collectionType`

Endpoints:
- `GET /api/authors`
- `POST /api/authors`
- `GET /api/authors/{id}`
- `PUT /api/authors/{id}`
- `DELETE /api/authors/{id}`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | No |  |
| `avatar` | media | No | types: images, files, videos; single |
| `email` | string | No |  |
| `articles` | relation (oneToMany) | No | oneToMany -> api::article.article |
| `blogs` | relation (oneToMany) | No | oneToMany -> api::blog.blog |

#### Response Examples

`GET /api/authors`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Sample name",
        "avatar": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "email": "user@example.com",
        "articles": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "title": "Sample title",
                "slug": "sample-slug"
              }
            }
          ]
        },
        "blogs": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "title": "Sample title",
                "slug": "sample-slug"
              }
            }
          ]
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/authors`
`GET /api/authors/{id}`
`PUT /api/authors/{id}`
`DELETE /api/authors/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Sample name",
      "avatar": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "email": "user@example.com",
      "articles": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "title": "Sample title",
              "slug": "sample-slug"
            }
          }
        ]
      },
      "blogs": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "title": "Sample title",
              "slug": "sample-slug"
            }
          }
        ]
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Blog (`blog`)

Blog posts for the Tinedy website

Type: `collectionType`

Endpoints:
- `GET /api/blogs`
- `POST /api/blogs`
- `GET /api/blogs/{id}`
- `PUT /api/blogs/{id}`
- `DELETE /api/blogs/{id}`

Draft & Publish: enabled (`publishedAt` present; use `publicationState=preview` to include drafts).

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `slug` | uid | Yes | auto from `title` |
| `excerpt` | text | Yes | maxLength: 240 |
| `coverImage` | media | No | types: images; single |
| `coverImageAlt` | string | No |  |
| `publishedOn` | date | No |  |
| `readTimeMinutes` | integer | No | min: 1 |
| `content` | dynamiczone | No | allowed: blog.heading, blog.paragraph, blog.image |
| `relatedBlogs` | relation (manyToMany) | No | manyToMany -> api::blog.blog |
| `category` | relation (manyToOne) | No | manyToOne -> api::category.category |
| `author` | relation (manyToOne) | No | manyToOne -> api::author.author |
| `seo` | component | No | shared.seo (single) |

#### Response Examples

`GET /api/blogs`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Sample title",
        "slug": "sample-slug",
        "excerpt": "Sample description",
        "coverImage": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "coverImageAlt": "Sample alt text",
        "publishedOn": "2024-01-01",
        "readTimeMinutes": 5,
        "content": [
          {
            "__component": "blog.heading",
            "id": 1,
            "text": "string"
          },
          {
            "__component": "blog.paragraph",
            "id": 1,
            "text": "string"
          },
          {
            "__component": "blog.image",
            "id": 1,
            "image": {
              "data": {
                "id": 1,
                "attributes": {
                  "name": "example.jpg",
                  "alternativeText": "Alt text",
                  "caption": "Caption",
                  "width": 1200,
                  "height": 800,
                  "formats": null,
                  "hash": "example_hash",
                  "ext": ".jpg",
                  "mime": "image/jpeg",
                  "size": 123.45,
                  "url": "/uploads/example.jpg",
                  "previewUrl": null,
                  "provider": "local",
                  "provider_metadata": null,
                  "createdAt": "2024-01-01T00:00:00.000Z",
                  "updatedAt": "2024-01-01T00:00:00.000Z"
                }
              }
            },
            "alt": "Sample alt text",
            "variant": "narrow"
          }
        ],
        "relatedBlogs": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "title": "Sample title",
                "slug": "sample-slug"
              }
            }
          ]
        },
        "category": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "Sample name",
              "slug": "sample-slug"
            }
          }
        },
        "author": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "Sample name",
              "email": "user@example.com"
            }
          }
        },
        "seo": {
          "id": 1,
          "metaTitle": "Sample title",
          "metaDescription": "Sample description",
          "shareImage": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          }
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/blogs`
`GET /api/blogs/{id}`
`PUT /api/blogs/{id}`
`DELETE /api/blogs/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Sample title",
      "slug": "sample-slug",
      "excerpt": "Sample description",
      "coverImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "coverImageAlt": "Sample alt text",
      "publishedOn": "2024-01-01",
      "readTimeMinutes": 5,
      "content": [
        {
          "__component": "blog.heading",
          "id": 1,
          "text": "string"
        },
        {
          "__component": "blog.paragraph",
          "id": 1,
          "text": "string"
        },
        {
          "__component": "blog.image",
          "id": 1,
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "alt": "Sample alt text",
          "variant": "narrow"
        }
      ],
      "relatedBlogs": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "title": "Sample title",
              "slug": "sample-slug"
            }
          }
        ]
      },
      "category": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "Sample name",
            "slug": "sample-slug"
          }
        }
      },
      "author": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "Sample name",
            "email": "user@example.com"
          }
        }
      },
      "seo": {
        "id": 1,
        "metaTitle": "Sample title",
        "metaDescription": "Sample description",
        "shareImage": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        }
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Career Page (`career-page`)

Career page content

Type: `singleType`

Endpoints:
- `GET /api/career-page`
- `PUT /api/career-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `heroTitle` | string | Yes |  |
| `heroImage` | media | Yes | types: images; single |
| `introEyebrow` | string | Yes |  |
| `introHeading` | richtext | Yes |  |
| `cultureCards` | component | Yes | career.culture-card (repeatable) |
| `jobSectionTitle` | string | Yes |  |
| `jobGroups` | component | Yes | career.job-group (repeatable) |

#### Response Examples

`GET /api/career-page`
`PUT /api/career-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "heroTitle": "Sample title",
      "heroImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "introEyebrow": "Sample eyebrow",
      "introHeading": "<p>Sample rich text</p>",
      "cultureCards": [
        {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "jobSectionTitle": "Sample title",
      "jobGroups": [
        {
          "id": 1,
          "title": "Sample title",
          "jobs": [
            {
              "id": 1,
              "title": "Sample title",
              "tags": [
                {
                  "id": 1,
                  "label": "Sample label"
                }
              ]
            }
          ]
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Category (`category`)

Organize your content into categories

Type: `collectionType`

Endpoints:
- `GET /api/categories`
- `POST /api/categories`
- `GET /api/categories/{id}`
- `PUT /api/categories/{id}`
- `DELETE /api/categories/{id}`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | No |  |
| `slug` | uid | No |  |
| `articles` | relation (oneToMany) | No | oneToMany -> api::article.article |
| `blogs` | relation (oneToMany) | No | oneToMany -> api::blog.blog |
| `description` | text | No |  |

#### Response Examples

`GET /api/categories`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Sample name",
        "slug": "sample-slug",
        "articles": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "title": "Sample title",
                "slug": "sample-slug"
              }
            }
          ]
        },
        "blogs": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "title": "Sample title",
                "slug": "sample-slug"
              }
            }
          ]
        },
        "description": "Sample description",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/categories`
`GET /api/categories/{id}`
`PUT /api/categories/{id}`
`DELETE /api/categories/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Sample name",
      "slug": "sample-slug",
      "articles": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "title": "Sample title",
              "slug": "sample-slug"
            }
          }
        ]
      },
      "blogs": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "title": "Sample title",
              "slug": "sample-slug"
            }
          }
        ]
      },
      "description": "Sample description",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Cleaning Service Page (`cleaning-service-page`)

Cleaning service page content

Type: `singleType`

Endpoints:
- `GET /api/cleaning-service-page`
- `PUT /api/cleaning-service-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `heroTitle` | string | Yes |  |
| `heroSubtitle` | text | Yes |  |
| `heroDescription` | richtext | Yes |  |
| `heroImage` | media | Yes | types: images; single |
| `productQualityHeading` | string | Yes |  |
| `productQualityIntro` | text | Yes |  |
| `productQualityCards` | component | Yes | service.card (repeatable) |
| `tersanoHeading` | string | Yes |  |
| `tersanoCards` | component | Yes | service.card (repeatable) |
| `quoteBannerOne` | component | Yes | service.quote-banner (single) |
| `teamHeading` | string | Yes |  |
| `teamIntro` | text | Yes |  |
| `teamCards` | component | Yes | service.card (repeatable) |
| `quoteBannerTwo` | component | Yes | service.quote-banner (single) |
| `bookingHeading` | string | Yes |  |
| `bookingSubheading` | text | Yes |  |
| `bookingReasons` | component | Yes | service.reason-item (repeatable) |
| `bookingBanner` | component | Yes | service.cta-banner (single) |

#### Response Examples

`GET /api/cleaning-service-page`
`PUT /api/cleaning-service-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "heroTitle": "Sample title",
      "heroSubtitle": "Sample title",
      "heroDescription": "<p>Sample rich text</p>",
      "heroImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "productQualityHeading": "Sample heading",
      "productQualityIntro": "Sample intro",
      "productQualityCards": [
        {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "tersanoHeading": "Sample heading",
      "tersanoCards": [
        {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "quoteBannerOne": {
        "id": 1,
        "backgroundImage": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "text": "string"
      },
      "teamHeading": "Sample heading",
      "teamIntro": "Sample intro",
      "teamCards": [
        {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "quoteBannerTwo": {
        "id": 1,
        "backgroundImage": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "text": "string"
      },
      "bookingHeading": "Sample heading",
      "bookingSubheading": "Sample heading",
      "bookingReasons": [
        {
          "id": 1,
          "icon": "room-cleaning",
          "text": "string"
        }
      ],
      "bookingBanner": {
        "id": 1,
        "title": "Sample title",
        "description": "Sample description",
        "ctaLabel": "Sample label",
        "ctaUrl": "https://example.com",
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "imageAlt": "Sample alt text"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Contact Form (`contact-form`)

Contact form submissions from the website

Type: `collectionType`

Endpoints:
- `GET /api/contact-forms`
- `POST /api/contact-forms`
- `GET /api/contact-forms/{id}`
- `PUT /api/contact-forms/{id}`
- `DELETE /api/contact-forms/{id}`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `fullName` | string | Yes |  |
| `phone` | string | Yes |  |
| `email` | email | Yes |  |
| `cleanDate` | string | Yes |  |
| `areaSize` | decimal | Yes |  |
| `message` | text | Yes |  |

#### Response Examples

`GET /api/contact-forms`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "fullName": "Sample name",
        "phone": "+66 123 456 789",
        "email": "user@example.com",
        "cleanDate": "string",
        "areaSize": 99.9,
        "message": "Sample message",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/contact-forms`
`GET /api/contact-forms/{id}`
`PUT /api/contact-forms/{id}`
`DELETE /api/contact-forms/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "fullName": "Sample name",
      "phone": "+66 123 456 789",
      "email": "user@example.com",
      "cleanDate": "string",
      "areaSize": 99.9,
      "message": "Sample message",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Contact Page (`contact-page`)

Contact page content

Type: `singleType`

Endpoints:
- `GET /api/contact-page`
- `PUT /api/contact-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `heroTitle` | string | Yes |  |
| `heroImage` | media | Yes | types: images; single |
| `contactHeading` | string | Yes |  |
| `socialHeading` | string | Yes |  |
| `mapEmbedUrl` | string | Yes |  |
| `formTitle` | string | Yes |  |
| `formDescription` | text | Yes |  |
| `formImage` | media | Yes | types: images; single |
| `formImageAlt` | string | No |  |

#### Response Examples

`GET /api/contact-page`
`PUT /api/contact-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "heroTitle": "Sample title",
      "heroImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "contactHeading": "Sample heading",
      "socialHeading": "Sample heading",
      "mapEmbedUrl": "https://example.com",
      "formTitle": "Sample title",
      "formDescription": "Sample description",
      "formImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "formImageAlt": "Sample alt text",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Contact (`contact`)

Contact details and social links

Type: `singleType`

Endpoints:
- `GET /api/contact`
- `PUT /api/contact`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `phone` | string | Yes |  |
| `email` | email | Yes |  |
| `socialLinks` | component | Yes | contact.social-link (repeatable) |

#### Response Examples

`GET /api/contact`
`PUT /api/contact`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "phone": "+66 123 456 789",
      "email": "user@example.com",
      "socialLinks": [
        {
          "id": 1,
          "label": "Sample label",
          "href": "https://example.com",
          "icon": "tiktok"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### FAQ (`faq`)

Frequently asked questions list

Type: `singleType`

Endpoints:
- `GET /api/faq`
- `PUT /api/faq`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `items` | component | Yes | faq.item (repeatable) |

#### Response Examples

`GET /api/faq`
`PUT /api/faq`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "items": [
        {
          "id": 1,
          "question": "string",
          "answerRows": [
            {
              "id": 1,
              "title": "Sample title",
              "description": "Sample description"
            }
          ]
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Global (`global`)

Define global settings

Type: `singleType`

Endpoints:
- `GET /api/global`
- `PUT /api/global`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `siteName` | string | Yes |  |
| `favicon` | media | No | types: images, files, videos; single |
| `siteDescription` | text | Yes |  |
| `defaultSeo` | component | No | shared.seo (single) |

#### Response Examples

`GET /api/global`
`PUT /api/global`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "siteName": "Sample name",
      "favicon": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "siteDescription": "Sample description",
      "defaultSeo": {
        "id": 1,
        "metaTitle": "Sample title",
        "metaDescription": "Sample description",
        "shareImage": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        }
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Home Feature (`home-feature`)

Homepage credibility cards

Type: `collectionType`

Endpoints:
- `GET /api/home-features`
- `POST /api/home-features`
- `GET /api/home-features/{id}`
- `PUT /api/home-features/{id}`
- `DELETE /api/home-features/{id}`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `description` | text | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | Yes |  |
| `order` | integer | No |  |

#### Response Examples

`GET /api/home-features`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Sample title",
        "description": "Sample description",
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "imageAlt": "Sample alt text",
        "order": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/home-features`
`GET /api/home-features/{id}`
`PUT /api/home-features/{id}`
`DELETE /api/home-features/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Sample title",
      "description": "Sample description",
      "image": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "imageAlt": "Sample alt text",
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Home Page (`home-page`)

Homepage hero content

Type: `singleType`

Endpoints:
- `GET /api/home-page`
- `PUT /api/home-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `hero` | component | Yes | home.hero (single) |
| `services` | component | Yes | home.service-card (repeatable) |
| `tersano` | component | Yes | home.tersano (single) |
| `featuredProductsHeading` | string | Yes |  |
| `featuredProductsLinkLabel` | string | No |  |
| `featuredProductsLinkUrl` | string | No |  |
| `recommendedProductsHeading` | string | Yes |  |
| `recommendedProductsLinkLabel` | string | No |  |
| `recommendedProductsLinkUrl` | string | No |  |
| `bookingBanner` | component | Yes | home.booking-banner (single) |

#### Response Examples

`GET /api/home-page`
`PUT /api/home-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "hero": {
        "id": 1,
        "eyebrow": "Sample eyebrow",
        "headingLines": [
          {
            "id": 1,
            "leadingText": "string",
            "highlightText": "Highlight text",
            "trailingText": "string",
            "accent": "navy"
          }
        ],
        "description": "Sample description",
        "primaryCtaLabel": "Sample label",
        "primaryCtaUrl": "https://example.com",
        "secondaryCtaLabel": "Sample label",
        "secondaryCtaUrl": "https://example.com",
        "heroImage": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "heroImageMobile": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        }
      },
      "services": [
        {
          "id": 1,
          "title": "Sample title",
          "anchorId": "string",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "tersano": {
        "id": 1,
        "title": "Sample title",
        "leftCard": {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        },
        "rightCard": {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      },
      "featuredProductsHeading": "Sample heading",
      "featuredProductsLinkLabel": "Sample label",
      "featuredProductsLinkUrl": "https://example.com",
      "recommendedProductsHeading": "Sample heading",
      "recommendedProductsLinkLabel": "Sample label",
      "recommendedProductsLinkUrl": "https://example.com",
      "bookingBanner": {
        "id": 1,
        "title": "Sample title",
        "ctaLabel": "Sample label",
        "ctaUrl": "https://example.com",
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "imageAlt": "Sample alt text"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Job Application (`job-application`)

Job application submissions from the careers form

Type: `collectionType`

Endpoints:
- `GET /api/job-applications`
- `POST /api/job-applications`
- `GET /api/job-applications/{id}`
- `PUT /api/job-applications/{id}`
- `DELETE /api/job-applications/{id}`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `job` | relation (manyToOne) | Yes | manyToOne -> api::job-opening.job-opening |
| `fullName` | string | Yes |  |
| `phone` | string | Yes |  |
| `email` | email | Yes |  |
| `workHistory` | text | Yes |  |
| `resume` | media | Yes | types: files; single |

#### Response Examples

`GET /api/job-applications`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "job": {
          "data": {
            "id": 1,
            "attributes": {
              "title": "Sample title",
              "slug": "sample-slug"
            }
          }
        },
        "fullName": "Sample name",
        "phone": "+66 123 456 789",
        "email": "user@example.com",
        "workHistory": "string",
        "resume": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/job-applications`
`GET /api/job-applications/{id}`
`PUT /api/job-applications/{id}`
`DELETE /api/job-applications/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "job": {
        "data": {
          "id": 1,
          "attributes": {
            "title": "Sample title",
            "slug": "sample-slug"
          }
        }
      },
      "fullName": "Sample name",
      "phone": "+66 123 456 789",
      "email": "user@example.com",
      "workHistory": "string",
      "resume": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Job Opening (`job-opening`)

Job opening details for the careers apply page

Type: `collectionType`

Endpoints:
- `GET /api/job-openings`
- `POST /api/job-openings`
- `GET /api/job-openings/{id}`
- `PUT /api/job-openings/{id}`
- `DELETE /api/job-openings/{id}`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `slug` | uid | Yes | auto from `title` |
| `tags` | component | Yes | career.job-tag (repeatable) |
| `requirements` | component | Yes | career.requirement (repeatable) |
| `location` | text | Yes |  |
| `contactLineId` | text | No |  |
| `contactPhone` | string | No |  |
| `contactNote` | string | No |  |
| `applications` | relation (oneToMany) | No | oneToMany -> api::job-application.job-application |

#### Response Examples

`GET /api/job-openings`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Sample title",
        "slug": "sample-slug",
        "tags": [
          {
            "id": 1,
            "label": "Sample label"
          }
        ],
        "requirements": [
          {
            "id": 1,
            "text": "string"
          }
        ],
        "location": "string",
        "contactLineId": "string",
        "contactPhone": "+66 123 456 789",
        "contactNote": "string",
        "applications": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "fullName": "Sample name",
                "phone": "+66 123 456 789"
              }
            }
          ]
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/job-openings`
`GET /api/job-openings/{id}`
`PUT /api/job-openings/{id}`
`DELETE /api/job-openings/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Sample title",
      "slug": "sample-slug",
      "tags": [
        {
          "id": 1,
          "label": "Sample label"
        }
      ],
      "requirements": [
        {
          "id": 1,
          "text": "string"
        }
      ],
      "location": "string",
      "contactLineId": "string",
      "contactPhone": "+66 123 456 789",
      "contactNote": "string",
      "applications": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "fullName": "Sample name",
              "phone": "+66 123 456 789"
            }
          }
        ]
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Other Services Page (`other-services-page`)

Other services page content

Type: `singleType`

Endpoints:
- `GET /api/other-services-page`
- `PUT /api/other-services-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `heroTitle` | string | Yes |  |
| `heroBrand` | string | Yes |  |
| `heroTagline` | text | Yes |  |
| `heroDescription` | text | Yes |  |
| `heroImage` | media | Yes | types: images; single |
| `banner` | component | Yes | service.cta-banner (single) |

#### Response Examples

`GET /api/other-services-page`
`PUT /api/other-services-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "heroTitle": "Sample title",
      "heroBrand": "string",
      "heroTagline": "string",
      "heroDescription": "Sample description",
      "heroImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "banner": {
        "id": 1,
        "title": "Sample title",
        "description": "Sample description",
        "ctaLabel": "Sample label",
        "ctaUrl": "https://example.com",
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "imageAlt": "Sample alt text"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Policy Page (`policy-page`)

Service policy page content

Type: `singleType`

Endpoints:
- `GET /api/policy-page`
- `PUT /api/policy-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | No |  |
| `sections` | component | Yes | policy.section (repeatable) |

#### Response Examples

`GET /api/policy-page`
`PUT /api/policy-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Sample title",
      "sections": [
        {
          "id": 1,
          "number": 1,
          "title": "Sample title",
          "body": "<p>Sample rich text</p>",
          "bullets": [
            {
              "id": 1,
              "text": "string"
            }
          ],
          "note": "<p>Sample rich text</p>"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Pricing (`pricing`)

Pricing packages and table rows

Type: `singleType`

Endpoints:
- `GET /api/pricing`
- `PUT /api/pricing`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `packages` | component | Yes | pricing.package (repeatable) |
| `notes` | component | No | pricing.note (repeatable) |

#### Response Examples

`GET /api/pricing`
`PUT /api/pricing`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "packages": [
        {
          "id": 1,
          "key": "string",
          "label": "Sample label",
          "rows": [
            {
              "id": 1,
              "area": "string",
              "hours": 1,
              "once": "string",
              "twice": "string",
              "fourTimes": "string",
              "eightTimes": "string"
            }
          ]
        }
      ],
      "notes": [
        {
          "id": 1,
          "text": "string"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Product iClean Mini Page (`product-iclean-mini-page`)

Landing page content for Tersano iClean mini

Type: `singleType`

Endpoints:
- `GET /api/product-iclean-mini-page`
- `PUT /api/product-iclean-mini-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `heroTitle` | string | Yes |  |
| `heroSubtitle` | text | Yes |  |
| `heroImage` | media | Yes | types: images; single |
| `featureEyebrow` | string | Yes |  |
| `featureHeading` | string | Yes |  |
| `featureDescription` | richtext | Yes |  |
| `featureCards` | component | Yes | product-landing.feature-card (repeatable) |
| `technicalSpecsHeading` | string | Yes |  |
| `technicalSpecs` | component | Yes | product-landing.spec-item (repeatable) |
| `certificationBackgroundImage` | media | Yes | types: images; single |
| `certificationHeading` | string | Yes |  |
| `certificationIntro` | text | Yes |  |
| `certificationStandards` | component | Yes | product-landing.standard-item (repeatable) |

#### Response Examples

`GET /api/product-iclean-mini-page`
`PUT /api/product-iclean-mini-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "heroTitle": "Sample title",
      "heroSubtitle": "Sample title",
      "heroImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "featureEyebrow": "Sample eyebrow",
      "featureHeading": "Sample heading",
      "featureDescription": "<p>Sample rich text</p>",
      "featureCards": [
        {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "technicalSpecsHeading": "Sample heading",
      "technicalSpecs": [
        {
          "id": 1,
          "icon": "battery",
          "label": "Sample label",
          "value": "string",
          "underlineValue": false
        }
      ],
      "certificationBackgroundImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "certificationHeading": "Sample heading",
      "certificationIntro": "Sample intro",
      "certificationStandards": [
        {
          "id": 1,
          "label": "Sample label",
          "value": "string"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Product PRO V9 Page (`product-pro-v9-page`)

Landing page content for Tersano lotus PRO V9

Type: `singleType`

Endpoints:
- `GET /api/product-pro-v9-page`
- `PUT /api/product-pro-v9-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `heroTitle` | string | Yes |  |
| `heroSubtitle` | text | Yes |  |
| `heroHighlight` | string | Yes |  |
| `heroImage` | media | Yes | types: images; single |
| `heroOverlay` | boolean | No |  |
| `featureEyebrow` | string | Yes |  |
| `featureHeading` | string | Yes |  |
| `featureDescription` | richtext | Yes |  |
| `featureCards` | component | Yes | product-landing.feature-card (repeatable) |
| `dashboardImage` | media | Yes | types: images; single |
| `dashboardHeading` | string | Yes |  |
| `dashboardDescription` | richtext | Yes |  |
| `cartridgesHeading` | string | Yes |  |
| `cartridgesDescription` | text | Yes |  |
| `cartridgesLinkLabel` | string | No |  |
| `cartridgesLinkUrl` | string | No |  |
| `cartridgeProducts` | relation (manyToMany) | No | manyToMany -> api::product.product |
| `technicalSpecsHeading` | string | Yes |  |
| `technicalSpecsImage` | media | Yes | types: images; single |
| `technicalSpecsTableTitle` | string | Yes |  |
| `technicalSpecsRows` | component | Yes | product-landing.table-row (repeatable) |
| `reasonsHeading` | string | Yes |  |
| `reasons` | component | Yes | product-landing.reason-item (repeatable) |
| `certificationBackgroundImage` | media | Yes | types: images; single |
| `certificationSealImage` | media | Yes | types: images; single |
| `certificationHeading` | string | Yes |  |
| `certificationIntro` | text | Yes |  |
| `certificationStandards` | component | Yes | product-landing.standard-item (repeatable) |

#### Response Examples

`GET /api/product-pro-v9-page`
`PUT /api/product-pro-v9-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "heroTitle": "Sample title",
      "heroSubtitle": "Sample title",
      "heroHighlight": "Highlight text",
      "heroImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "heroOverlay": true,
      "featureEyebrow": "Sample eyebrow",
      "featureHeading": "Sample heading",
      "featureDescription": "<p>Sample rich text</p>",
      "featureCards": [
        {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "dashboardImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "dashboardHeading": "Sample heading",
      "dashboardDescription": "<p>Sample rich text</p>",
      "cartridgesHeading": "Sample heading",
      "cartridgesDescription": "Sample description",
      "cartridgesLinkLabel": "Sample label",
      "cartridgesLinkUrl": "https://example.com",
      "cartridgeProducts": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "title": "Sample title",
              "slug": "sample-slug"
            }
          }
        ]
      },
      "technicalSpecsHeading": "Sample heading",
      "technicalSpecsImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "technicalSpecsTableTitle": "Sample title",
      "technicalSpecsRows": [
        {
          "id": 1,
          "label": "Sample label",
          "value": "string"
        }
      ],
      "reasonsHeading": "Sample heading",
      "reasons": [
        {
          "id": 1,
          "icon": "safer",
          "title": "Sample title",
          "description": "Sample description"
        }
      ],
      "certificationBackgroundImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "certificationSealImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "certificationHeading": "Sample heading",
      "certificationIntro": "Sample intro",
      "certificationStandards": [
        {
          "id": 1,
          "label": "Sample label",
          "value": "string"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Product (`product`)

Product catalog entries

Type: `collectionType`

Endpoints:
- `GET /api/products`
- `POST /api/products`
- `GET /api/products/{id}`
- `PUT /api/products/{id}`
- `DELETE /api/products/{id}`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `category` | enum | Yes | values: แบรนด์ Tersano, แบรนด์ Tinedy |
| `title` | string | Yes |  |
| `slug` | uid | Yes | auto from `title` |
| `sku` | string | Yes | unique |
| `price` | decimal | Yes |  |
| `stock` | integer | Yes |  |
| `regularPrice` | decimal | No |  |
| `discountPrice` | decimal | No |  |
| `featuredSection` | enum | No | values: home-tech, home-recommended |
| `featuredOrder` | integer | No |  |
| `detail` | text | Yes |  |
| `thumbnail` | media | Yes | types: images; single |
| `images` | media[] | No | types: images; multiple |
| `technicalInformation` | component | Yes | product.technical-spec-table (single) |
| `howToUse` | text | No |  |
| `shippingAndReturns` | text | No |  |

#### Response Examples

`GET /api/products`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "category": "แบรนด์ Tersano",
        "title": "Sample title",
        "slug": "sample-slug",
        "sku": "string",
        "price": 99.9,
        "stock": 1,
        "regularPrice": 99.9,
        "discountPrice": 99.9,
        "featuredSection": "home-tech",
        "featuredOrder": 1,
        "detail": "Sample description",
        "thumbnail": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "images": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          ]
        },
        "technicalInformation": {
          "id": 1,
          "detailHeader": "Sample description",
          "columnOneHeader": "string",
          "columnTwoHeader": "string",
          "rows": [
            {
              "id": 1,
              "label": "Sample label",
              "columnOne": "string",
              "columnTwo": "string"
            }
          ]
        },
        "howToUse": "string",
        "shippingAndReturns": "string",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/products`
`GET /api/products/{id}`
`PUT /api/products/{id}`
`DELETE /api/products/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "category": "แบรนด์ Tersano",
      "title": "Sample title",
      "slug": "sample-slug",
      "sku": "string",
      "price": 99.9,
      "stock": 1,
      "regularPrice": 99.9,
      "discountPrice": 99.9,
      "featuredSection": "home-tech",
      "featuredOrder": 1,
      "detail": "Sample description",
      "thumbnail": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "images": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        ]
      },
      "technicalInformation": {
        "id": 1,
        "detailHeader": "Sample description",
        "columnOneHeader": "string",
        "columnTwoHeader": "string",
        "rows": [
          {
            "id": 1,
            "label": "Sample label",
            "columnOne": "string",
            "columnTwo": "string"
          }
        ]
      },
      "howToUse": "string",
      "shippingAndReturns": "string",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Testimonial (`testimonial`)

Customer testimonials with image, quote, and author

Type: `collectionType`

Endpoints:
- `GET /api/testimonials`
- `POST /api/testimonials`
- `GET /api/testimonials/{id}`
- `PUT /api/testimonials/{id}`
- `DELETE /api/testimonials/{id}`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `quote` | text | Yes |  |
| `author` | string | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | Yes |  |

#### Response Examples

`GET /api/testimonials`
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "quote": "Sample quote",
        "author": "string",
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "imageAlt": "Sample alt text",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

`POST /api/testimonials`
`GET /api/testimonials/{id}`
`PUT /api/testimonials/{id}`
`DELETE /api/testimonials/{id}`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "quote": "Sample quote",
      "author": "string",
      "image": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "imageAlt": "Sample alt text",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Training Service Page (`training-service-page`)

Training service page content

Type: `singleType`

Endpoints:
- `GET /api/training-service-page`
- `PUT /api/training-service-page`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `heroTitle` | string | Yes |  |
| `heroSubtitle` | text | Yes |  |
| `heroDescription` | richtext | Yes |  |
| `heroImage` | media | Yes | types: images; single |
| `introText` | text | Yes |  |
| `introBackgroundImage` | media | No | types: images; single |
| `introImages` | component | Yes | service.image-item (repeatable) |
| `outcomesHeading` | string | Yes |  |
| `outcomes` | component | Yes | service.outcome-item (repeatable) |
| `topicsHeading` | string | Yes |  |
| `topics` | component | Yes | service.card (repeatable) |
| `clientsHeading` | string | Yes |  |
| `clients` | component | Yes | service.client-card (repeatable) |
| `ctaBanner` | component | Yes | service.cta-banner (single) |

#### Response Examples

`GET /api/training-service-page`
`PUT /api/training-service-page`
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "heroTitle": "Sample title",
      "heroSubtitle": "Sample title",
      "heroDescription": "<p>Sample rich text</p>",
      "heroImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "introText": "Sample intro",
      "introBackgroundImage": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "example.jpg",
            "alternativeText": "Alt text",
            "caption": "Caption",
            "width": 1200,
            "height": 800,
            "formats": null,
            "hash": "example_hash",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "size": 123.45,
            "url": "/uploads/example.jpg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
          }
        }
      },
      "introImages": [
        {
          "id": 1,
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "outcomesHeading": "Sample heading",
      "outcomes": [
        {
          "id": 1,
          "icon": "team",
          "title": "Sample title",
          "description": "Sample description"
        }
      ],
      "topicsHeading": "Sample heading",
      "topics": [
        {
          "id": 1,
          "title": "Sample title",
          "description": "Sample description",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "clientsHeading": "Sample heading",
      "clients": [
        {
          "id": 1,
          "description": "Sample description",
          "company": "string",
          "location": "string",
          "image": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "example.jpg",
                "alternativeText": "Alt text",
                "caption": "Caption",
                "width": 1200,
                "height": 800,
                "formats": null,
                "hash": "example_hash",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 123.45,
                "url": "/uploads/example.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z"
              }
            }
          },
          "imageAlt": "Sample alt text"
        }
      ],
      "ctaBanner": {
        "id": 1,
        "title": "Sample title",
        "description": "Sample description",
        "ctaLabel": "Sample label",
        "ctaUrl": "https://example.com",
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "example.jpg",
              "alternativeText": "Alt text",
              "caption": "Caption",
              "width": 1200,
              "height": 800,
              "formats": null,
              "hash": "example_hash",
              "ext": ".jpg",
              "mime": "image/jpeg",
              "size": 123.45,
              "url": "/uploads/example.jpg",
              "previewUrl": null,
              "provider": "local",
              "provider_metadata": null,
              "createdAt": "2024-01-01T00:00:00.000Z",
              "updatedAt": "2024-01-01T00:00:00.000Z"
            }
          }
        },
        "imageAlt": "Sample alt text"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "meta": {}
}
```

## Components

### Hero (`about.hero`)

About page hero section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `backgroundImage` | media | Yes | types: images; single |
| `body` | richtext | Yes |  |

### Manifesto Item (`about.manifesto-item`)

Single line in the About manifesto section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `leadingText` | string | Yes |  |
| `highlightText` | string | Yes |  |
| `highlightColor` | enum | Yes | values: blue, yellow, green |
| `description` | text | No |  |

### Manifesto Section (`about.manifesto`)

We Clean / We Train / You Relax section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `items` | component | Yes | about.manifesto-item (repeatable) |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |

### Mission Section (`about.mission`)

Mission text with supporting image

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `description` | text | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |

### Story Item (`about.story-item`)

Single text + image row in the about story section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `eyebrow` | string | Yes |  |
| `title` | text | Yes |  |
| `description` | text | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |
| `imagePosition` | enum | Yes | values: left, right |

### Story Section (`about.story-section`)

Two-column story section on the about page

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `items` | component | Yes | about.story-item (repeatable) |

### Heading (`blog.heading`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `text` | string | Yes |  |

### Image (`blog.image`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `image` | media | Yes | types: images; single |
| `alt` | string | No |  |
| `variant` | enum | No | values: narrow, wide |

### Paragraph (`blog.paragraph`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `text` | text | Yes |  |

### Culture Card (`career.culture-card`)

Image card for the career culture section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `description` | text | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | Yes |  |

### Job Group (`career.job-group`)

Group of jobs for a team

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `jobs` | component | Yes | career.job (repeatable) |

### Job Tag (`career.job-tag`)

Label for a job tag

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `label` | string | Yes |  |

### Job (`career.job`)

Single job item

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `tags` | component | Yes | career.job-tag (repeatable) |

### Requirement (`career.requirement`)

Single bullet line in job requirements

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `text` | text | Yes |  |

### Contact Social Link (`contact.social-link`)

Social link shown in contact section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `label` | string | Yes |  |
| `href` | string | Yes |  |
| `icon` | enum | Yes | values: tiktok, facebook, line, instagram |

### FAQ Answer Row (`faq.answer-row`)

Single row in the FAQ answer list

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `description` | text | Yes |  |

### FAQ Item (`faq.item`)

Question and its answer rows

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `question` | string | Yes |  |
| `answerRows` | component | Yes | faq.answer-row (repeatable) |

### Booking Banner (`home.booking-banner`)

CTA banner for booking services on the home page

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | text | Yes |  |
| `ctaLabel` | string | Yes |  |
| `ctaUrl` | string | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |

### Hero Line (`home.hero-line`)

Single headline line with a highlighted word

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `leadingText` | string | Yes |  |
| `highlightText` | string | Yes |  |
| `trailingText` | string | No |  |
| `accent` | enum | Yes | values: navy, gold, sage |

### Hero (`home.hero`)

Homepage hero section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `eyebrow` | string | Yes |  |
| `headingLines` | component | Yes | home.hero-line (repeatable) |
| `description` | text | Yes |  |
| `primaryCtaLabel` | string | Yes |  |
| `primaryCtaUrl` | string | Yes |  |
| `secondaryCtaLabel` | string | Yes |  |
| `secondaryCtaUrl` | string | Yes |  |
| `heroImage` | media | No | types: images; single |
| `heroImageMobile` | media | No | types: images; single |

### Product Card (`home.product-card`)

Product feature card for the Tersano section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `description` | text | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | Yes |  |

### Service Card (`home.service-card`)

Image card for homepage services section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `anchorId` | string | No |  |
| `description` | text | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | Yes |  |

### Tersano Section (`home.tersano`)

Two product cards shown in the Tersano section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `leftCard` | component | Yes | home.product-card (single) |
| `rightCard` | component | Yes | home.product-card (single) |

### Policy Bullet (`policy.bullet`)

Single bullet line in a policy section

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `text` | text | Yes |  |

### Policy Section (`policy.section`)

Numbered policy section with body text and bullets

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `number` | integer | Yes |  |
| `title` | string | Yes |  |
| `body` | richtext | No |  |
| `bullets` | component | No | policy.bullet (repeatable) |
| `note` | richtext | No |  |

### Pricing Note (`pricing.note`)

Footnote for pricing table

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `text` | string | Yes |  |

### Pricing Package (`pricing.package`)

Package tab and its rows

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `key` | string | Yes | unique |
| `label` | string | Yes |  |
| `rows` | component | Yes | pricing.row (repeatable) |

### Pricing Row (`pricing.row`)

Single row in the pricing table

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `area` | string | Yes |  |
| `hours` | integer | Yes |  |
| `once` | string | Yes |  |
| `twice` | string | Yes |  |
| `fourTimes` | string | Yes |  |
| `eightTimes` | string | Yes |  |

### Feature Card (`product-landing.feature-card`)

Feature card with image, title, and description

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `description` | text | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |

### Reason Item (`product-landing.reason-item`)

Reason item with icon, title, and description

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `icon` | enum | Yes | values: safer, save-time-cost, proven-performance, sustainability |
| `title` | string | Yes |  |
| `description` | text | Yes |  |

### Spec Item (`product-landing.spec-item`)

Technical spec item with icon

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `icon` | enum | Yes | values: battery, spray, filter, faucet, badge, safety |
| `label` | string | Yes |  |
| `value` | string | Yes |  |
| `underlineValue` | boolean | No |  |

### Standard Item (`product-landing.standard-item`)

Certification standard item

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `label` | string | Yes |  |
| `value` | text | Yes |  |

### Table Row (`product-landing.table-row`)

Simple label/value row

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `label` | string | Yes |  |
| `value` | string | Yes |  |

### Technical Spec Row (`product.technical-spec-row`)

Row in the technical specification table

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `label` | string | Yes |  |
| `columnOne` | string | Yes |  |
| `columnTwo` | string | Yes |  |

### Technical Spec Table (`product.technical-spec-table`)

Technical specification table for product details

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `detailHeader` | string | Yes |  |
| `columnOneHeader` | string | Yes |  |
| `columnTwoHeader` | string | Yes |  |
| `rows` | component | Yes | product.technical-spec-row (repeatable) |

### Service Card (`service.card`)

Image card with title and description

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes |  |
| `description` | text | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |

### Client Card (`service.client-card`)

Client testimonial card

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `description` | text | Yes |  |
| `company` | string | Yes |  |
| `location` | string | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |

### CTA Banner (`service.cta-banner`)

Image banner with CTA button

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | text | Yes |  |
| `description` | text | No |  |
| `ctaLabel` | string | Yes |  |
| `ctaUrl` | string | Yes |  |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |

### Image Item (`service.image-item`)

Standalone image item

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `image` | media | Yes | types: images; single |
| `imageAlt` | string | No |  |

### Outcome Item (`service.outcome-item`)

Outcome item with icon, title, and description

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `icon` | enum | Yes | values: team, shield-check, uptrend, consistency, sustainability |
| `title` | string | Yes |  |
| `description` | text | Yes |  |

### Quote Banner (`service.quote-banner`)

Full-width banner with background image and overlay text

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `backgroundImage` | media | Yes | types: images; single |
| `text` | text | Yes |  |

### Reason Item (`service.reason-item`)

Icon + text item for service reasons

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `icon` | enum | Yes | values: room-cleaning, people, floor, ecology-1 |
| `text` | text | Yes |  |

### Media (`shared.media`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `file` | media | No | types: images, files, videos; single |

### Quote (`shared.quote`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | No |  |
| `body` | text | No |  |

### Rich text (`shared.rich-text`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `body` | richtext | No |  |

### Seo (`shared.seo`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `metaTitle` | string | Yes |  |
| `metaDescription` | text | Yes |  |
| `shareImage` | media | No | types: images; single |

### Slider (`shared.slider`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `files` | media[] | No | types: images; multiple |
