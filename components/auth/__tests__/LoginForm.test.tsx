import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import LoginForm from "@/components/auth/LoginForm";

vi.mock("@/app/actions/auth", () => ({ login: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));
vi.mock("@/lib/auth/AuthProvider", () => ({ useAuth: () => ({ refresh: vi.fn() }) }));

afterEach(cleanup);

describe("LoginForm — préserve le contexte (`next`) vers mot de passe oublié", () => {
  it("carries `next` into the forgot-password link when provided", () => {
    render(<LoginForm next="/offre" />);
    expect(screen.getByRole("link", { name: /mot de passe oublié/i })).toHaveAttribute(
      "href",
      "/mot-de-passe-oublie?next=%2Foffre"
    );
  });

  it("omits the next param entirely when there is no context to preserve", () => {
    render(<LoginForm />);
    expect(screen.getByRole("link", { name: /mot de passe oublié/i })).toHaveAttribute(
      "href",
      "/mot-de-passe-oublie"
    );
  });
});
