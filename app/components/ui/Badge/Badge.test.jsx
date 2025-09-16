import { Badge } from "./Badge";
import { badgeVariants } from "./BadgeVariants";

import { render, screen } from "@testing-library/react";

describe("Badge", () => {
  it("renders with default styles", () => {
    render(<Badge>Info</Badge>);
    const badge = screen.getByText("Info");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(badgeVariants({ variant: "default" }));
  });

  it("applies variant classes", () => {
    render(<Badge variant="destructive">Error</Badge>);
    const badge = screen.getByText("Error");
    expect(badge).toHaveClass(badgeVariants({ variant: "destructive" }));
  });

  it("accepts a custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("custom-class");
  });

  it("renders as Slot when asChild is true", () => {
    render(
      <Badge asChild>
        <a href="/test">Link Badge</a>
      </Badge>,
    );
    const link = screen.getByRole("link", { name: "Link Badge" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("data-slot", "badge");
  });
});
