<h2 align="center"> Fuzzytab </h2>


<p align="center">
        <img src="https://img.shields.io/badge/Version-0.5.0-informational.svg?style=for-the-badge&logo=hackthebox&color=161616&logoColor=42be65&labelColor=dde1e6"></a>
    <img src="https://img.shields.io/github/last-commit/vasujain275/fuzzytab?style=for-the-badge&labelColor=dde1e6&color=161616"/>
    <img src="https://img.shields.io/github/repo-size/vasujain275/fuzzytab?style=for-the-badge&labelColor=dde1e6&color=161616"/>
  </a>
</p>



A keyboard focused fzf inspired browser extension for blazingly fast navigation.

## Development Setup

Follow these steps to set up the development environment for this browser extension.

### Prerequisites

- [pnpm](https://pnpm.io/installation)

### Clone the Repository

```zsh
git clone <repository-url>
cd <repository-name>
```

### Install Dependencies

```zsh
pnpm install
```

### Firefox Development

To run the extension in development mode on Firefox:

```zsh
pnpm run dev:firefox
```

To build the extension for Firefox:

```zsh
pnpm run build:firefox
```

The built extension will be available in the `.output/firefox-mv2` directory.

To generate a zip file of the Firefox extension:

```zsh
pnpm run zip:firefox
```

### Chrome Development

To run the extension in development mode on Chrome:

```zsh
pnpm run dev:chrome
```

To build the extension for Chrome:

```zsh
pnpm run build:chrome
```

The built extension will be available in the `.output/chrome-mv2` directory.

To generate a zip file of the Chrome extension:

```zsh
pnpm run zip:chrome
```

## Scripts

- `pnpm run dev:firefox`: Run the extension in development mode on Firefox.
- `pnpm run build:firefox`: Build the extension for Firefox.
- `pnpm run zip:firefox`: Generate a zip file of the Firefox extension.
- `pnpm run dev:chrome`: Run the extension in development mode on Chrome.
- `pnpm run build:chrome`: Build the extension for Chrome.
- `pnpm run zip:chrome`: Generate a zip file of the Chrome extension.
