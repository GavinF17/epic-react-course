# Notes

## Lazy state initialisation

Passing `useState` a function to initialise will cause it to only be called on the initial render, which can help limit
costly computation.

```tsx
useState(() => someExpensiveComputation())
```

See [react-hooks 2 extra credit 1](react-hooks/src/exercise/02.md)

## React Hook Flow

![](react-hooks/src/examples/hook-flow.png)