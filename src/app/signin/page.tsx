import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignInCover from "../../assets/images/signin-cover.png";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center  bg-background flex-1 p-4">
      <div
        className="w-full max-w-md bg-secondary
       rounded-[20px] shadow-lg overflow-hidden p-4 "
      >
        <div className="relative     overflow-hidden">
          <Image
            src={SignInCover}
            alt="Collage of meme faces and emojis"
            objectFit="cover"
            className="rounded-[12px]"
          />
        </div>
        <div className="p-2 space-y-4  mt-2">
          <h1 className="text-2xl  text-center text-gray">Sign in</h1>
          <p className="text-center text-gray-600">
            Unlock the full potential of your own creativity!
          </p>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full rounded-full justify-center text-gray-foreground"
            >
              <svg
                fill="currentColor"
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
			c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
                />
                <path
                  d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
			c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
			c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
			c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
			c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
			c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
                />
              </svg>
              <p className="text-foreground">Continue with Apple</p>
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full justify-center text-gray-foreground"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              <p className="text-foreground">Continue with Google</p>
            </Button>
          </div>
          <div>
            <p className="text-xs text-center text-gray-500">
              By creating an account you agree with talktoo.ai
            </p>
            <p className="text-xs text-center text-gray-500">
              <Link href="/terms" className="underline hover:text-gray-700">
                terms of use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-gray-700">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
