export default function Footer() {
  return (
    <footer className="bg-secondary/50 mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Evergreen Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
