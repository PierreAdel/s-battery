import { Button } from "./Button";
import { buttonVariants } from "./ButtonVariants";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  describe("Button", () => {
    it("renders with default styles", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });
  });

  it("renders with default styles", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      buttonVariants({ variant: "default", size: "default" }),
    );
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass(
      buttonVariants({ variant: "destructive", size: "lg" }),
    );
  });

  it("accepts a custom className", () => {
    render(<Button className="custom-class">Click</Button>);
    const button = screen.getByRole("button", { name: "Click" });
    expect(button).toHaveClass("custom-class");
  });

  it("renders disabled state correctly", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
  });

  it("supports aria-invalid styling", () => {
    render(<Button aria-invalid="true">Invalid</Button>);
    const button = screen.getByRole("button", { name: "Invalid" });
    expect(button).toHaveAttribute("aria-invalid", "true");
  });

  it("renders as Slot when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("data-slot", "button");
  });

  it("calls onClick handler", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
