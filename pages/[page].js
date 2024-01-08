import Link from "next/link";
import fetch from "isomorphic-unfetch";

import { BACKEND_BASE_URL } from "../constants/constants";

import styles from "../styles/[page].module.css";

export async function getStaticPaths() {
  const totalNumberOfPages = 10;
  const paths = Array.from(
    { length: totalNumberOfPages },
    (_, index) => `/${index + 1}`
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params?.page, 10) || 1;
  const response = await fetch(`${BACKEND_BASE_URL}/${page}`);
  const data = await response.json();

  return {
    props: {
      data,
      page,
    },
  };
}

const DynamicPage = ({ data, page }) => {
  return (
    <main className={styles.container}>
      <h1 className={styles.beerHeader}>Beer List - Page {page}</h1>
      <ul className={styles.list}>
        {data.map((beer) => (
          <li key={beer.id} className={styles.beerItem}>
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {page > 1 ? (
          <Link className={styles.previousPage} href={`/${page - 1}`}>
            Previous Page
          </Link>
        ) : (
          <span className={`${styles.previousPage} ${styles.disabled}`}>
            Previous Page
          </span>
        )}
        <Link className={styles.nextPage} href={`/${page + 1}`}>
          Next Page
        </Link>
      </div>
    </main>
  );
};

export default DynamicPage;
