import Link from "next/link";

export default function Page({ slug, foo }) {
  return (
    <div>
      <h1>Docs</h1>
      <p>
        Page: {slug}, foo: {foo}
      </p>
      <ul>
        <li>
          <Link href="/docs">Back to docs</Link>
        </li>
        <li>
          <Link href="/docs/about">About</Link>
        </li>
      </ul>
      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        What's happening here?
      </h2>
      <p style={{ marginBottom: "2rem" }}>
        Using an optional catch-all route, along with a middleware, causes the
        page data for the index route to not be fetched properly on client-side
        transitions. Click "Back to docs" above and notice the data is wiped
        out. When inspecting the page data request, you'll notice that markup is
        returned instead of the expected JSON object.
      </p>
      <p>
        Reproduction:{" "}
        <a
          href="https://github.com/BRKalow/middleware-page-data-bug/tree/main"
          target="_blank"
        >
          https://github.com/BRKalow/middleware-page-data-bug/tree/main
        </a>
      </p>
    </div>
  );
}

export function getStaticProps({ params }) {
  const slug = params?.slug?.join("/") || "index";

  return {
    props: {
      slug,
      foo: "bar",
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ["index"] } },
      { params: { slug: ["about"] } },
      { params: { slug: [""] } },
    ],
    fallback: "blocking",
  };
}
