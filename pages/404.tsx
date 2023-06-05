import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
