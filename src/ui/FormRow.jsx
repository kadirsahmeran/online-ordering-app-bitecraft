// -----------------------------------------------------------------------------
// Component: FormRow
// Description: Reusable component used to group form fields by row.
// Features:
//   - columns: Determines how many columns there will be (1 or 2)

// -----------------------------------------------------------------------------

export default function FormRow({ children, columns = 1, className = "" }) {
  // If two column layout is selected, apply flex and gap
  const layout = columns === 2 && `flex ${className} gap-5`;

  return <div className={layout}>{children}</div>;
}
