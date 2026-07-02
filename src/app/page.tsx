export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Portfolio Platform</h1>

        <p>
          URL Loaded:{" "}
          {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Yes" : "❌ No"}
        </p>

        <p>
          Publishable Key Loaded:{" "}
          {process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
            ? "✅ Yes"
            : "❌ No"}
        </p>
      </div>
    </main>
  );
}  