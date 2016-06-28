FROM node:6.2.2
# (Based on Debian Jessie)

# Make sure `npm install` is cachable
# (credits: http://www.clock.co.uk/blog/a-guide-on-how-to-cache-npm-install-with-docker)
ADD package.json /opt/project/
RUN cd /opt/project && npm install
ADD . /opt/project

# Convenience for running gulp etc. through the container:
ENV PATH $PATH:./node_modules/.bin/

WORKDIR /opt/project

EXPOSE 3000

# Example usage:
#
# docker build -t es6-boilerplate . && \
# docker run -it --rm es6-boilerplate npm start    # or `gulp serve` etc.
