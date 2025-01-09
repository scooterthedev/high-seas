export const category_names = [
  'template',
  'project_type',
  'tech_stack',
  'platform',
  'domain',
  'scale',
  'architecture',
  'data_source',
  'features',
  'integration',
  'audience',
  'optimization_goal',
  'constraint',
  'theme',
  'wildcard',
]

export const data = `
----------------- Notes -----------------
• Categories are defined by #categoryname: ... #end
• <a> will be replaced with a/an depending on context
• @name@ will be replaced with a call to the corresponding generate function
• Some generate functions also accept parameters: @name:comma,separated,parameters@


----------------- TEMPLATE -----------------

#template:
<a> @scale@ @project_type@ using @tech_stack@ for @audience@ with @features@ and @features@
<a> @scale@ @domain@ application built with @tech_stack@ featuring @features@ @optimization_goal@
<a> @project_type@ that integrates with @integration@ to solve @theme@ using @architecture@ architecture
<a> @scale@ @platform@ project focused on @theme@ and @theme@ using @tech_stack@ @constraint@
<a> @domain@ system that leverages @data_source@ to provide @features@ @wildcard@
<a> cross-platform solution combining @tech_stack@ and @tech_stack@ to address @theme@ @optimization_goal@
<a> @project_type@ that transforms how @audience@ interact with @domain@ data using @architecture@
<a> @scale@ [collaboration, integration] between @tech_stack@ and @integration@ @wildcard:always@
#end

----------------- PROJECT TYPES -----------------
#project_type:
physics engine
genetic algorithm simulation
procedural world generator
music visualizer
programming language
text editor
3D engine
game engine
visual programming environment
retro computer emulator
custom CPU architecture
neural network visualization
particle system
city simulation
robot controller
audio synthesizer
file system
operating system
ray tracer
cellular automata simulator
fractal generator
voxel engine
compiler
path-finding visualizer
maze generator
shader playground
digital circuit simulator
image processing pipeline
weather simulation
virtual machine
neural network from scratch
gesture recognition system
computer vision pipeline
sound synthesizer
quantum computer simulator
voice synthesizer
#end

----------------- TECH STACK -----------------
#tech_stack:
React
Vue.js
Angular
Node.js
Python
Django
Flask
FastAPI
Ruby on Rails
PHP
Laravel
Go
Rust
Java
Spring Boot
.NET Core
Kotlin
Swift
Flutter
React Native
TensorFlow
PyTorch
PostgreSQL
MongoDB
Redis
Kubernetes
Docker
GraphQL
REST
WebSocket
WebAssembly
Elasticsearch
Apache Kafka
RabbitMQ
Unity
Unreal Engine
#end

----------------- PLATFORM -----------------
#platform:
web
iOS
Android
Windows
macOS
Linux
cross-platform
serverless
edge computing
cloud-native
hybrid cloud
multi-cloud
progressive web app
#end

----------------- DOMAIN -----------------
#domain:
healthcare
finance
education
entertainment
gaming
social media
e-commerce
transportation
real estate
hospitality
manufacturing
agriculture
energy
telecommunications
retail
logistics
insurance
legal
government
non-profit
scientific research
cybersecurity
environmental
artificial intelligence
blockchain
Internet of Things
#end

----------------- SCALE -----------------
#scale:
small-scale
medium-scale
large-scale
enterprise-level
startup-focused
prototype
proof-of-concept
production-ready
scalable
distributed
#end

----------------- ARCHITECTURE -----------------
#architecture:
microservices
monolithic
serverless
event-driven
layered
hexagonal
CQRS
clean
model-view-controller (MVC)
model-view-presenter (MVP)
model-view-viewmodel (MVVM)
domain-driven design (DDD)
service-oriented
peer-to-peer
#end

----------------- DATA SOURCES -----------------
#data_source:
real-time sensors
social media feeds
public APIs
satellite imagery
user-generated content
IoT devices
blockchain
machine learning models
historical databases
web scraping
streaming data
time series data
geospatial data
biometric data
financial markets
weather data
scientific instruments
customer feedback
security logs
transaction records
#end

----------------- FEATURES -----------------
#features:
real-time fluid dynamics
interactive 3D fractals
multi-agent swarm behavior
recursive terrain generation
emergent life simulation
self-modifying code
physics-based animations
custom shader effects
evolutionary algorithms
brain-computer interface
real-time audio synthesis
quantum computation simulation
procedural music generation
DNA sequence visualization
neural network visualization
particle collision detection
wave function collapse
perlin noise landscapes
dynamic mesh generation
realtime ray marching
bitmap font renderer
custom memory allocator
artificial life ecosystem
fourier transform visualizer
conway's game of life variants
inverse kinematics system
neural style transfer
markov chain text generator
custom bytecode interpreter
generative art system
#end

----------------- INTEGRATIONS -----------------
#integration:
payment gateways
social media platforms
email services
cloud storage
mapping services
analytics platforms
CRM systems
accounting software
project management tools
communication platforms
authentication providers
content delivery networks
search engines
advertising networks
shipping providers
calendar systems
document processing
video streaming services
SMS gateways
voice services
#end

----------------- TARGET AUDIENCE -----------------
#audience:
developers
business analysts
data scientists
project managers
small businesses
enterprise companies
healthcare providers
educational institutions
government agencies
financial institutions
content creators
remote teams
mobile users
power users
casual users
administrators
customers
employees
students
researchers
#end

----------------- OPTIMIZATION GOALS -----------------
#optimization_goal:
optimized for [performance, security, scalability]
focused on [user experience, accessibility, reliability]
designed for [maintainability, extensibility, reusability]
prioritizing [speed, accuracy, efficiency]
emphasizing [simplicity, flexibility, robustness]
maximizing [throughput, availability, compatibility]
minimizing [latency, resource usage, downtime]
#end

----------------- CONSTRAINTS -----------------
#constraint:
with strict security requirements
under tight performance constraints
with limited resource availability
requiring offline functionality
needing real-time processing
following regulatory compliance
supporting legacy systems
maintaining backward compatibility
requiring zero-downtime updates
operating in low-bandwidth environments
#end

----------------- THEMES -----------------
#theme:
artificial life
emergent behavior
generative art
chaos theory
quantum mechanics
neural networks
parallel universes
consciousness simulation
genetic evolution
morphogenesis
recursive patterns
wave propagation
complex systems
cellular automata
swarm intelligence
self-organization
fractal geometry
computational biology
fluid dynamics
particle physics
space exploration
virtual ecosystems
synthetic biology
cognitive architectures
cybernetic systems
alien mathematics
time manipulation
dimensional warping
entropy visualization
dream simulation
#end

----------------- WILDCARDS -----------------
#wildcard:
with built-in analytics
featuring AI-powered recommendations
using blockchain for transparency
with edge computing capabilities
supporting multiple languages
offering white-label solutions
including comprehensive documentation
providing developer APIs
featuring a plug-in architecture
with automated deployment
using containerization
supporting cloud-native development
with comprehensive monitoring
featuring A/B testing capabilities
using microservices architecture
#end
`
