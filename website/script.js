/**
 * Volumography.com — Main Script
 * Sci-Fi OS Style with Recursive Internal Card Layout
 * 
 * CLICK INTERACTION DESIGN:
 * - Clicking card (cover/name) → Opens Creative.Tech page
 * - Clicking website link → Opens official website
 * - Clicking social icons → Opens respective social page
 * - Tags are NOT clickable (just labels)
 */

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const tagFiltersContainer = document.getElementById('tag-filters');
    const sortSelect = document.getElementById('sort-select');
    const resetBtn = document.getElementById('reset-filters');
    const resultsNumber = document.getElementById('results-number');

    let allCreators = [];
    let assetsManifest = {};
    let selectedTags = new Set();
    let currentSort = 'priority';

    /**
     * Convert string to Title Case
     */
    // Words that should preserve their original case (acronyms, etc.)
    const preserveCase = ['VFX', '3D', '4D', '3DGS', '4DGS', 'AI', 'AR', 'VR', 'XR', 'NeRF', 'LiDAR'];
    
    const toTitleCase = (str) => {
        if (!str) return '';
        return str.replace(/\w\S*/g, (txt) => {
            // Check if word should preserve its case
            const upperTxt = txt.toUpperCase();
            const preserved = preserveCase.find(p => p.toUpperCase() === upperTxt);
            if (preserved) return preserved;
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    /**
     * Format URL for display (remove protocol and www)
     */
    const formatUrl = (url) => {
        if (!url) return '';
        return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    };

    /**
     * Get first letter of name for avatar placeholder
     */
    const getInitial = (name) => {
        if (!name) return '?';
        return name.trim().charAt(0).toUpperCase();
    };

    /**
     * Social media icons (simple unicode)
     */
    const socialIcons = {
        twitter: '𝕏',
        instagram: '◎',
        youtube: '▶',
        github: '⌘',
        linkedin: '◉',
        tiktok: '♪'
    };

    /**
     * Get asset paths for a creator from the manifest
     */
    const getAssetPaths = (creatorId) => {
        const assets = assetsManifest[creatorId] || {};
        const basePath = `assets/creators/${creatorId}`;
        
        return {
            profile: assets.profile ? `${basePath}/${assets.profile}` : null,
            cover: assets.cover ? `${basePath}/${assets.cover}` : null,
            gallery: (assets.gallery || []).map(img => `${basePath}/gallery/${img}`)
        };
    };

    /**
     * Get cover image for a creator
     * Priority: cover > random gallery image > null
     */
    const getCoverImage = (creatorId) => {
        const assets = getAssetPaths(creatorId);
        if (assets.cover) return assets.cover;
        if (assets.gallery && assets.gallery.length > 0) {
            // Random image from gallery
            const randomIndex = Math.floor(Math.random() * assets.gallery.length);
            return assets.gallery[randomIndex];
        }
        return null;
    };

    /**
     * Create a creator card element
     * 
     * STRUCTURE:
     * ┌─────────────────────────┐
     * │ [AVA]              [↗]  │  ← Avatar overlay (only if has avatar), arrow (if CT link)
     * │     [COVER/PREVIEW]     │
     * │                         │
     * ├─────────────────────────┤
     * │ Name                    │  ← Wraps if long
     * │ Title                   │
     * │ Subtitle                │
     * │ Location                │
     * │ website.com             │  ← Mono font, theme color
     * │ 𝕏  ◎  ▶                 │  ← Social icons
     * ├─────────────────────────┤
     * │ [TAG] [TAG]             │  ← Clickable, syncs with filter
     * └─────────────────────────┘
     */
    const createCard = (creator, index) => {
        // Get links
        const ctLink = creator.links?.ct || null;
        const websiteLink = creator.links?.website || null;
        const hasCTLink = !!ctLink;

        // Get images from assets manifest
        const assets = getAssetPaths(creator.id);
        const coverImage = getCoverImage(creator.id);
        const hasAvatar = !!assets.profile;

        // Create card container
        const card = document.createElement(hasCTLink ? 'a' : 'div');
        card.className = 'creator-card';
        card.style.animationDelay = `${index * 30}ms`;
        
        if (hasCTLink) {
            card.href = ctLink;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
        }

        // Build card HTML
        let html = '';
        
        // ===== MEDIA SECTION (TOP) =====
        html += '<div class="card-media">';
        
        // Cover image or placeholder
        if (coverImage) {
            html += `<img src="${coverImage}" alt="${toTitleCase(creator.name)}" class="cover-image" loading="lazy">`;
        } else {
            html += '<div class="card-media-placeholder">No Preview</div>';
        }
        
        // Avatar overlay - ONLY show if creator has avatar image
        if (hasAvatar) {
            html += `<div class="card-avatar-overlay"><img src="${assets.profile}" alt="${toTitleCase(creator.name)}"></div>`;
        }
        // Note: If no avatar, we don't show anything (no initial letter)
        
        // Link arrow - ONLY if CT link exists
        if (hasCTLink) {
            html += '<span class="card-arrow">↗</span>';
        }
        html += '</div>';
        
        // ===== INFO SECTION (BOTTOM) =====
        html += '<div class="card-info">';
        
        // Name + Origin Name (if exists)
        html += '<div class="card-name">';
        html += toTitleCase(creator.name);
        if (creator.name_origin) {
            html += ` <span class="card-origin-name">${creator.name_origin}</span>`;
        }
        html += '</div>';
        
        // Title
        if (creator.title) {
            html += `<div class="card-specialty">${toTitleCase(creator.title)}</div>`;
        }
        
        // Subtitle (below title)
        if (creator.subtitle) {
            html += `<div class="card-subtitle">${creator.subtitle}</div>`;
        }
        
        // Location
        if (creator.location) {
            html += `<div class="card-location">${creator.location}</div>`;
        }
        
        // Links
        const hasSocialLinks = creator.links && Object.keys(creator.links).some(k => 
            k !== 'ct' && k !== 'website' && socialIcons[k]
        );
        
        if (websiteLink || hasSocialLinks) {
            html += '<div class="card-links">';
            
            if (websiteLink) {
                html += `<a href="${websiteLink}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation();">${formatUrl(websiteLink)}</a>`;
            }
            
            if (hasSocialLinks) {
                html += '<div class="card-social">';
                for (const [platform, url] of Object.entries(creator.links)) {
                    if (url && platform !== 'ct' && platform !== 'website' && socialIcons[platform]) {
                        html += `<a href="${url}" target="_blank" rel="noopener" class="social-icon" title="${platform}" onclick="event.stopPropagation();">${socialIcons[platform]}</a>`;
                    }
                }
                html += '</div>';
            }
            
            html += '</div>';
        }
        
        // Tags - sorted by global tag order
        if (creator.tags?.length) {
            html += '<div class="card-tags">';
            const sortedTags = sortTagsByOrder(creator.tags);
            sortedTags.forEach(tag => {
                const isActive = selectedTags.has(tag) ? 'active' : '';
                html += `<button class="tag ${isActive}" data-tag="${tag}" onclick="event.stopPropagation(); event.preventDefault(); window.toggleTagFilter('${tag}')">${tag}</button>`;
            });
            html += '</div>';
        }
        
        html += '</div>';

        card.innerHTML = html;

        // Setup hover carousel if multiple images available
        const allImages = [coverImage, ...assets.gallery].filter(Boolean);
        // Remove duplicates
        const uniqueImages = [...new Set(allImages)];
        
        if (uniqueImages.length > 1) {
            setupHoverCarousel(card, uniqueImages);
        }

        return card;
    };

    /**
     * Setup hover carousel for card
     * Cycles through images when hovering
     */
    const setupHoverCarousel = (card, images) => {
        const imgElement = card.querySelector('.cover-image');
        if (!imgElement || images.length < 2) return;

        let intervalId = null;
        let currentIndex = 0;
        const originalSrc = imgElement.src;

        card.addEventListener('mouseenter', () => {
            currentIndex = 0;
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                imgElement.src = images[currentIndex];
            }, 600); // Change image every 600ms
        });

        card.addEventListener('mouseleave', () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            imgElement.src = originalSrc;
        });
    };

    /**
     * Render the gallery
     */
    const renderGallery = () => {
        // Filter
        let filtered = allCreators.filter(creator => {
            if (selectedTags.size === 0) return true;
            return creator.tags && creator.tags.some(tag => selectedTags.has(tag));
        });

        // Sort
        switch (currentSort) {
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'date-desc':
                // Newest first
                filtered.sort((a, b) => (b.addedDate || '').localeCompare(a.addedDate || ''));
                break;
            case 'date-asc':
                // Oldest first
                filtered.sort((a, b) => (a.addedDate || '').localeCompare(b.addedDate || ''));
                break;
            case 'random':
                filtered.sort(() => Math.random() - 0.5);
                break;
            case 'priority':
            default:
                // Keep original order (or could prioritize by other criteria)
                break;
        }

        // Update count
        resultsNumber.textContent = filtered.length;
        
        // Clear and rebuild
        gallery.innerHTML = '';
        
        if (filtered.length === 0) {
            gallery.innerHTML = `
                <div class="col-span-full text-center py-20 bg-[#0a0a0a]">
                    <p class="text-[#888] text-sm">No Creators Found</p>
                    <button onclick="document.getElementById('reset-filters').click()" 
                            class="text-[#0052FF] text-sm mt-4">
                        Clear Filters
                    </button>
                </div>
            `;
            return;
        }
        
        // Create and append cards
        filtered.forEach((creator, index) => {
            const card = createCard(creator, index);
            gallery.appendChild(card);
        });
    };

    /**
     * Setup filter buttons
     */
    // Global tag order (sorted by usage count, populated in setupFilters)
    let tagOrder = [];

    /**
     * Setup filter buttons - sorted by usage count (most to least)
     */
    const setupFilters = (data) => {
        // Count tag usage
        const tagCounts = {};
        data.forEach(c => c.tags?.forEach(t => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
        }));
        
        // Sort tags by count (descending), then alphabetically
        tagOrder = Object.keys(tagCounts).sort((a, b) => {
            const countDiff = tagCounts[b] - tagCounts[a];
            if (countDiff !== 0) return countDiff;
            return a.localeCompare(b);
        });
        
        tagFiltersContainer.innerHTML = '';
        
        tagOrder.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = tag;
            
            btn.addEventListener('click', () => {
                toggleTagFilter(tag);
            });
            
            tagFiltersContainer.appendChild(btn);
        });
    };

    /**
     * Sort creator's tags according to global tag order
     */
    const sortTagsByOrder = (tags) => {
        if (!tags || !tagOrder.length) return tags || [];
        return [...tags].sort((a, b) => {
            const indexA = tagOrder.indexOf(a);
            const indexB = tagOrder.indexOf(b);
            // If not found in order, put at end
            const posA = indexA === -1 ? Infinity : indexA;
            const posB = indexB === -1 ? Infinity : indexB;
            return posA - posB;
        });
    };

    /**
     * Toggle tag filter - can be called from card tags or filter bar
     */
    const toggleTagFilter = (tag) => {
        if (selectedTags.has(tag)) {
            selectedTags.delete(tag);
        } else {
            selectedTags.add(tag);
        }
        
        // Update filter bar buttons
        document.querySelectorAll('#tag-filters .filter-btn').forEach(btn => {
            if (btn.textContent === tag) {
                btn.classList.toggle('active', selectedTags.has(tag));
            }
        });
        
        renderGallery();
    };

    // Expose to global scope for inline onclick handlers
    window.toggleTagFilter = toggleTagFilter;

    /**
     * Reset filters
     */
    resetBtn.addEventListener('click', () => {
        selectedTags.clear();
        document.querySelectorAll('#tag-filters .filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        renderGallery();
    });

    /**
     * Sort change
     */
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGallery();
    });

    /**
     * Load data - creators.json and assets-manifest.json
     */
    Promise.all([
        fetch('data/creators.json').then(res => res.json()),
        fetch('data/assets-manifest.json').then(res => res.json())
    ])
        .then(([creators, manifest]) => {
            allCreators = creators;
            assetsManifest = manifest;
            setupFilters(creators);
            renderGallery();
        })
        .catch(err => {
            console.error('Error loading data:', err);
            gallery.innerHTML = `
                <div class="col-span-full text-center py-20 bg-[#0a0a0a]">
                    <p class="text-red-400 text-sm">Failed To Load Creator Data</p>
                </div>
            `;
        });
});
