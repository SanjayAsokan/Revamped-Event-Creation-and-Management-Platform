import EventWizard from "../components/organizer/EventWizard";
import UserLayout from "@/layouts/UserLayout";

export default function CreateEvent() {
  return (
    <UserLayout>
      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
        <EventWizard />
      </div>
    </UserLayout>
  );
}
