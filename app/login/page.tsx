import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
    return (
        <div className="border p-8 min-w-md">
            <form>
                <h3 className="font-semibold mb-2 text-4xl text-center">
                    Login
                </h3>
                <hr className="my-4" />
                <label htmlFor="username" className="font-medium text-xl">
                    Username
                </label>
                <Input
                    name="username"
                    type="text"
                    placeholder="Your username"
                    id="username"
                    className="mt-4 mb-8"
                    required
                />
                <label htmlFor="password" className="font-medium text-xl">
                    Password
                </label>
                <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="mt-4"
                    required
                />
                <Button className="green text-xl w-full mt-8 py-2 h-auto cursor-pointer">
                    Log In
                </Button>
            </form>
        </div>
    );
}
