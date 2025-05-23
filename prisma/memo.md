# Prismaに関するメモ

## Prisma CLI

```sh
npx prisma db push
```

schemaをDBに反映

```sh
npx prisma db seed
```

([こちら](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding)を参考に作成)シーダーを流してくれる

```sh
npx prisma generate
```

プリズマクライアント生成

```sh
npx prisma migrate dev --name {name}
```

schemaからmigrationファイルを作成

```sh
npx prisma migrate reset
```

migrationファイルを使ってテーブルを作り直す。レコードを全て削除され、seederがあれば流してくれる。

### スキーマ修正した後にやること

- format

```sh
npx prisma format
```

- マイグレーション作成

```sh
npx prisma migrate dev --name {migration name}
```

- アプリ起動中の場合は再起動

```sh
ctrl+c
npm run dev
```

- (プリズマクライアント生成)

```sh
npx prisma generate
```

マイグレーション生成の時にプリズマクラアントも再生成されているっぽい

## スキーマ定義

```mermaid
erDiagram
  workout ||--|{ exercise : has
  exercise ||--o{ set : has
  exercise ||--o{ rest : has
  workout {
    date date
  }
  exercise {
    string name
  }
  set {
    int weight
    int rep
    int order
  }
  rest {
    int time
    int order
  }
```
