import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Accounting App</h1>
      <p className="mb-4 text-lg">Manage your accounts easily with our platform.</p>
      <div className="flex gap-4">
        {/* Link to Sign Up */}
        <Link 
          href="/signup" 
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
          Sign Up
        </Link>

        {/* Link to Log In */}
        <Link 
          href="/login" 
          className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition">
          Log In
        </Link>
      </div>
    </div>
  );
}
