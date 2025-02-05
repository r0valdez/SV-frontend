export default function ErrorToast({ message }) {
  return (
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
      <span className="font-medium">{message}</span>
    </div>
  );
}