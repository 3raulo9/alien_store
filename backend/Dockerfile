# Stage 1: Build React frontend
FROM node:18 AS build

# Set working directory
WORKDIR /frontend

# Copy React app source code
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy React app source code
COPY frontend/ ./

# Build the React app
RUN npm run build

# Stage 2: Build Django backend
FROM python:3.11 AS django

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY backend/ /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Copy built React app to Django static files directory
COPY --from=build /frontend/build /app/static

# Expose port 8000
EXPOSE 8000

# Start the server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myproj.wsgi:application"]
