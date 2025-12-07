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
        npm-install = "npm install || echo 'Initial npm install failed. Please check for errors and run manually.'";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Run install only if package.json or the lockfile has changed.
        install-deps = ''
          # --- Robust Dependency Check Script ---
          set -e # Exit immediately if a command exits with a non-zero status.

          # Function to print error messages to stderr
          error_exit() {
            echo "Error: $1" >&2
            exit 1
          }

          # 1. Ensure package.json exists
          [ -f package.json ] || error_exit "package.json not found. Cannot check dependencies."

          # 2. Determine which lock file to use for checksum
          checksum_files="package.json"
          if [ -f package-lock.json ]; then
            checksum_files="$checksum_files package-lock.json"
          elif [ -f pnpm-lock.yaml ]; then
            checksum_files="$checksum_files pnpm-lock.yaml"
          fi

          # 3. Calculate current checksum
          current_checksum=$(sha256sum $checksum_files | sha256sum | awk '{print $1}')

          # 4. Define the checksum storage file path
          checksum_file="node_modules/.last_install_checksum"

          # 5. Compare checksums and act accordingly
          if ! [ -f "$checksum_file" ] || [ "$current_checksum" != "$(cat "$checksum_file" 2>/dev/null)" ]; then
            echo "Dependencies have changed or this is the first start. Running npm install..."
            
            # Run npm install and capture its exit code
            if npm install; then
              echo "npm install successful."
              # On success, create the directory if it doesn't exist and write the new checksum
              mkdir -p "$(dirname "$checksum_file")"
              echo "$current_checksum" > "$checksum_file"
            else
              # If npm install fails, report the error and exit
              error_exit "npm install failed. Please review the logs above for details."
            fi
          else
            echo "Dependencies are up to date. Skipping install."
          fi

          echo "Environment is ready."
        '';
      };
    };
  };
}
