import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

vi.mock("@/app/actions/auth", () => ({ requestPasswordReset: vi.fn() }));

afterEach(cleanup);

describe("ForgotPasswordForm — reporte `next` jusque dans l'email de réinitialisation", () => {
  it("includes a hidden `next` field carrying the original destination", () => {
    const { container } = render(<ForgotPasswordForm next="/offre" />);
    const hidden = container.querySelector('input[type="hidden"][name="next"]');
    expect(hidden).not.toBeNull();
    expect(hidden).toHaveValue("/offre");
  });

  it("renders no hidden next field when there is nothing to preserve", () => {
    const { container } = render(<ForgotPasswordForm />);
    expect(container.querySelector('input[type="hidden"][name="next"]')).toBeNull();
  });
});
