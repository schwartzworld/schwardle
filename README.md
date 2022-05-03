# schwardle
## Wordle for the command line

`schwardle` is written in TypeScript using Deno.

### Installation

1. Install `deno` according to the documentation https://deno.land/manual/getting_started/installation
2. From the project folder run `deno run --allow-read --allow-write --allow-env index.ts`

If you'd prefer to have an executable, you can compile one for your system with the command `deno compile --allow-read --allow-write --allow-env index.ts`. This will create an executable called `schwardle` which you can copy to `/usr/local/bin` to execute from anywhere (`mv schwardle /usr/local/bin/schwardle`)
