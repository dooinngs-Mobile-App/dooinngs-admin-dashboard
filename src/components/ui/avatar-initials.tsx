type Props = { name: string; className?: string };

export function AvatarInitials({ name, className }: Props) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`w-9 h-9 rounded-full bg-[#F82C5D] flex items-center justify-center text-white text-xs font-bold shrink-0 ${className ?? ""}`}
    >
      {initials}
    </div>
  );
}
