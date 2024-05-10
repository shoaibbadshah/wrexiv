type DirtyFields = boolean | { [key: string]: boolean | DirtyFields };
type Values = any | { [key: string]: any };

// https://github.com/orgs/react-hook-form/discussions/1991#discussioncomment-31308
// Map RHF's dirtyFields over the `data` received by `handleSubmit` and return the changed subset of that data.
export function getDirtyValues(
  dirtyFields: DirtyFields,
  allValues: Values
): object {
  if (dirtyFields === false) return {};
  // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
  // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;
  // Here, we have an object
  return Object.fromEntries(
    Object.keys(dirtyFields).map(key => [
      key,
      getDirtyValues(dirtyFields[key], allValues[key]),
    ])
  );
}
