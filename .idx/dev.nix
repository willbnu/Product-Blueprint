# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ ... }: {
--- a/AGENTS.md
+++ b/AGENTS.md
@@ -632,6 +632,15 @@
 
 ## Common Tasks
 
+### Task 0: Environment Verification
+
+Before starting any task, ensure the environment is ready.
+
+```bash
+# 1. Verify Node.js version (must be v20+)
+node --version
+
+# 2. Install dependencies
+npm install
+```
 
 
 ### Task 4: Create a Pull Request
@@ -655,7 +664,7 @@
 EOF
 )"
 
-# 4. If gh CLI not available, inform user to create PR manually
+# 4. If gh CLI is not available, generate the PR title and body and instruct the user to create the PR manually on GitHub with the provided content.
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
    # pkgs.nodejs_20
    # pkgs.nodePackages.nodemon
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
        #   command = ["npm" "run" "dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     PORT = "$PORT";
        #   };
        # };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
