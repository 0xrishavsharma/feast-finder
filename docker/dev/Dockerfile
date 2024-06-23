# Use the official Node.js 18 image as the base for our Docker image.
# This provides a pre-configured Node.js environment.
FROM node:18

# ----------Building the image----------------

# Set the working directory for any subsequent ADD, COPY, CMD, ENTRYPOINT,
# or RUN instructions that follow in the Dockerfile.
# Here, /usr/src/app is designated as the working directory.
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory to leverage Docker's caching mechanism.
# This step is done before installing dependencies to avoid re-running npm install
# if there are no changes in package.json or yarn.lock.
# The `./` (current directory) on the right side of COPY refers to the working directory set by WORKDIR,
# which is /usr/src/app in this case.
COPY package.json yarn.lock ./

# Install Yarn globally and then use Yarn to install the app dependencies as specified in package.json and yarn.lock.
# This ensures that the versions of the dependencies are locked to those specified in yarn.lock,
# leading to more predictable and consistent builds.
RUN npm install -g yarn && yarn install

# Copy the rest of the app's source code into the container.
# Here, the `.` on the left side refers to the entire context of the directory from which the build command Docker was run (usually the project root).
# The `.` on the right side refers to the current working directory inside the image, set by WORKDIR (/usr/src/app).
# This command copies all files from your project directory (excluding those in .dockerignore) into the /usr/src/app directory in the image.
COPY . .

# Expose port 5501 to the outside once the container has launched.
# This is more for documentation purposes, as EXPOSE does not actually publish the port.
# It functions as a type of documentation between the person who builds the image and the person who runs the container,
# about which ports are intended to be published.
EXPOSE 5501

# ----------Image built successfully----------------

# ----------Running the image----------------
# Define the command to run the app using Yarn.
# This CMD instruction specifies the default command to run when the container starts.
# Here, it uses Yarn to run the "dev" script defined in package.json.
CMD ["yarn", "run", "dev"]