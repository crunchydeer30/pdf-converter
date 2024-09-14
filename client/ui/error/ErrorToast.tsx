export default function ErrorToast({ error }: { error: string }) {
  return (
    <div className="absolute top-0 left-0 w-full bg-[#fbe4e2] flex items-center justify-center gap-3 p-2">
      <svg className="w-6 h-6 fill-red-500">
        <use href={`/assets/icons.svg#error_outline`}></use>
      </svg>
      <span className="text-lg font-semibold">{error}</span>
    </div>
  );
}
