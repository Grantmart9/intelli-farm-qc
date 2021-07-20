{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { flake-utils, nixpkgs, ... }:
    flake-utils.lib.eachDefaultSystem
      (system:
        with nixpkgs.legacyPackages.${system};
        with nodePackages;
        {
          devShell = pkgs.mkShell {
            buildInputs = [
              typescript typescript-language-server
              eslint prettier
              vscode-css-languageserver-bin
              nodejs
              yarn
              heroku
            ];
          };
        });
}
