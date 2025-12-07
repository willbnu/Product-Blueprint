# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.coreutils # Provides sha256sum
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [];

    # Enable previews
    previews = {
      enable = true;
      previews = {};
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # For brand new workspaces, always run install the first time.
        npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Run install only if package.json or the lockfile has changed.
        install-deps = ''
          # Create a checksum of the files that define the dependencies.
          # If package-lock.json exists, it's the most reliable source of truth.
          if [ -f package-lock.json ]; then
            current_checksum=$(sha256sum package.json package-lock.json | sha256sum)
          else
            current_checksum=$(sha256sum package.json | sha256sum)
          fi

          # If the checksum file doesn't exist or the checksum is different, run npm install.
          if ! [ -f node_modules/.last_install_checksum ] || [ "$current_checksum" != "$(cat node_modules/.last_install_checksum 2>/dev/null)" ]; then
            echo "Dependencies have changed, running npm install..."
            npm install && echo "$current_checksum" > node_modules/.last_install_checksum
          else
            echo "Dependencies are up to date, skipping install."
          fi
        '';
      };
    };
  };
}
