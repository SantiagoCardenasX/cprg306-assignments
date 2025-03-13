import Link from "next/link";

export default function Page() {
    return (
      <main>
        <h1>CPRG 306: Web Development 2 - Assignments</h1>
        <p><Link href={"/week-2"}>Click to go to week 2</Link></p>
        <p><Link href={"/week-3"}>Click to go to week 3</Link></p>
        <p><Link href={"/week-4"}>Click to go to week 4</Link></p>
        <p><Link href={"/week-5"}>Click to go to week 5</Link></p>
        <p><Link href={"/week-6"}>Click to go to week 6</Link></p>
        <p><Link href={"/week-7"}>Click to go to week 7</Link></p>
        <p><Link href={"/week-8"}>Click to go to week 8</Link></p>
        <p><Link href={"/week-9"}>Click to go to week 9</Link></p>
      </main>
    );
  }