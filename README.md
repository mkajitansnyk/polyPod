# polyPod

The polyPod

At the moment, the polyPod is essentially a runtime for _features_; small,
sandboxed JavaScript applications that can be launched from the polyPod app.

But it will be much more than that, for more information read [the polyPod
whitepaper].

## Please note

The code in this repository used to be spread across more than a dozen
individual repositories. While it generally works, there are still a few things
we need to fix, including adjusting the overall structure and documentation.

## Components

### CLI for building and testing Features

The [orodruin](orodruin) package includes everything needed to develop and test
features.

### polyPod app for Android

You can find the Android version of the polyPod in
[polyPod-Android](polyPod-Android).

### The shared polyPod core code

All the other packages contain the internal workings of the polyPod, such as the
feature runtime execution environment. Refer to the individual packages to learn
more about what they are for, but note that we aim to improve the structure,
naming and documentation to make things more understandable.

## Requirements

- [Node.js](https://nodejs.org/) version 14.10.1 or newer
- [Yarn](https://yarnpkg.com/) version 1.22.5 or newer (but not Yarn 2.x)

## Building

Just execute:

    $ node build.js

Then you can build [polyPod-Android](polyPod-Android), or
[orodruin/example](orodruin/example).

### Wat

Yes, we have a nasty custom build script.

The initial polyPod code base is composed of various small modules that used to
live in different repositories, including each other via package
registries. After migrating these projects into a single repository, we kept
them as separate packages for now. Building these properly turned out to be a
challenge.

Yes we tried Yarna workspaces, Yarna 2.x, pnpm, you name it. The ultimate
problem seems to be this: The _podigree_ dependency required by _orodruin_
breaks the build (i.e. leads to a broken _container.js_) if it is referenced
through a symbolic link. Yarn's `file:` protocol forces copying the directory
into `node_modules`, which alleviates the issues. If we can solve this issue, we
can presumably move to Yarna 2.x, workspaces and all, and get rid of that nasty
custom build script.

## Testing

### Automated tests

To run the tests, just execute:

    $ node build.js --with-tests

Or even:

    $ node build.js --with-linting --with-tests

Please note that some tests are currently not being executed by these commands -
because they fail. We will reenable them as soon as we got them to work
reliably.


[the polyPod whitepaper]: https://polypoly.coop/static/polypoly_Whitepaper_polyPod.pdf
