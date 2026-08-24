export default function SoldRibbon() {
  return (
    <div className="absolute top-0 left-0 w-28 h-28 overflow-hidden pointer-events-none z-10">
      <span
        className="absolute top-[26px] left-[-38px] w-[170px] text-center py-1.5 bg-red-600 text-white text-xs font-extrabold uppercase tracking-widest shadow-lg -rotate-45"
      >
        Sold
      </span>
    </div>
  );
}
