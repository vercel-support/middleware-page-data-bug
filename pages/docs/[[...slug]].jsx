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
    </div>
  );
}

export function getStaticProps({ params }) {
  const slug = params?.slug?.join("/") ?? "index";

  return {
    props: {
      slug,
      foo: "bar",
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { slug: ["index"] } }, { params: { slug: ["about"] } }],
    fallback: "blocking",
  };
}
