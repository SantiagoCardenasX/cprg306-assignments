import Link from "next/link";

export default function Page() {
    return (
      <main>
        <h1>CPRG 306: Web Development 2 - Assignments</h1>
        <p><Link href={"/week-2"}>Click to go to week 2</Link></p>
        <p><Link href={"/week-3"}>Click to go to week 3</Link></p>
        <p><Link href={"/week-4"}>Click to go to week 4</Link></p>
      </main>
    );
  }