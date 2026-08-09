import { DataTable } from "@/components/ui/data-table";
import { customerColumns, type Customer } from "./columns";

// TODO: replace with real API data
const mockCustomers: Customer[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  name: "Joshua Gavu",
  phone: "+233 20 203 6170",
  email: "gavujoshua@gmail.com",
  bookings: 527,
}));

export default function CustomersPage() {
  return (
    <div className="p-8">
      <DataTable
        columns={customerColumns}
        data={mockCustomers}
        title="Customers"
        searchPlaceholder="Search customers..."
      />
    </div>
  );
}
