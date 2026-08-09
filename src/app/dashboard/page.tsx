import Image from "next/image";
import { StatCard } from "@/components/admin/StatCard";

export default function DashboardPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          icon={<Image src="/images/money-bag.svg" alt="money bag" width={50} height={50} />}
          title="Total Processed Transactions"
          value="GHS 100,486.00"
        />
        <StatCard
          icon={<Image src="/images/money-bag.svg" alt="money bag" width={50} height={50} />}
          title="Total Revenue"
          value="GHS 20,972.64"
        />
        <StatCard
          icon={<Image src="/images/money-bag.svg" alt="money bag" width={50} height={50} />}
          title="Total Profit"
          value="GHS 20,563.67"
        />
        <StatCard
          icon={<Image src="/images/calendar.svg" alt="money bag" width={50} height={50} />}
          title="All Bookings"
          value="1683"
        />
        <StatCard
          icon={<Image src="/images/credit.svg" alt="money bag" width={50} height={50} />}
          title="Total Completed Bookings"
          value="758"
        />
        <StatCard
          icon={<Image src="/images/copydynamic.svg" alt="copydynamic" width={50} height={50} />}
          title="Total Reviews"
          value="838"
        />
        <StatCard
          icon={<Image src="/images/case.svg" alt="copydynamic" width={50} height={50} />}
          title="Total Artisans"
          value="417"
        />
        <StatCard
          icon={<Image src="/images/boydynamic.svg" alt="bodydynamic" width={50} height={50} />}
          title="Total Customers"
          value="294"
        />
      </div>
    </div>
  );
}
