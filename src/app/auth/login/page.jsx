import LoginForm from "@/components/Authentication/LoginComponents/LoginForm";

export default function page() {
  return (
    <div className="max-w-150 w-full mx-auto flex flex-col items-center justify-center min-h-screen overflow-auto">
      <LoginForm />
    </div>
  );
}
