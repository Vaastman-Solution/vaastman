import { Button } from "@/components/ui/button";


import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

export default async function Page() {

  await 


  return (
    <div>
      <h1>this is h1</h1>
      <h2>fsa</h2>
      <p>this is p</p>
      <blockquote>this is blockquote</blockquote>
      <code>this is code</code>
    </div>
  )
}