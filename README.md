# Reactive store
This package is a simple utility that allows you to create a reactive store/cache
to help you to manage you application state or cache.

## Installation

    npm i @4strodev/reactive_store

## Usage
```ts
// Using typescript
interface AuthStoreInterface {
    accessToken?: string;
    refreshToken?: string;
    username: string;
}
const authStore = new Store<AuthStoreInterface>({
    username: "No username set"
});

// Listening for changes
const usernameObservable = authStore.selectOnly(store => store.username);

// Now a console log is printed showing username
usernameObservable.subscribe(console.log)

// Making changes
authStore.patchState({username: "Foo"});
// Now another console log is printed showing username

```

